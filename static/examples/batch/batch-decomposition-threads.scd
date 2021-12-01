(
s.reboot;
s.waitForBoot({
    // Store the location of the FluCoMa audio files in the audioFiles variable
    var audioFiles = PathName(File.realpath(FluidDataSet.class.filenameSymbol).dirname.withTrailingSlash ++ "../AudioFiles/");
    // Create a dictionary that will contain the resulting buffer, associated to a string which represents the original source file
    var results = Dictionary.new;

    var condition = Condition();
    var counter = 0;
    var wav = audioFiles.files.removeAllSuchThat({ |file| file.extension == "wav" });
    wav.size.postln;
    // In the language iterate over all the files in the example audio files directory
    wav.do({ |file|
        fork ({
            var src = Buffer.read(s, file.fullPath.asString); // Create a buffer with the source audio in a buffer called "src"
            // Create two buffers, h and p for the harmonic and percussive outputs respectively
            var h = Buffer.new(s);
            var p = Buffer.new(s);
            // Create a new buffer that we will compose into so harmonic and percussive exist in a two-channel buffer, rather than two separate mono buffers.
            var result = Buffer.new(s);

            ("Processing:"+file.fileName.asString).postln;
            // Do the HPSS processing. Only process the first channel to simplify things when we process a stereo file.
            // We call the processBlocking method in order to do synchronous calls that will happen in a deterministic order.
            // Later on you will see the process method being used to do asynchronous calls between the language and server.
            FluidBufHPSS.process(s, source:src, harmonic:h, percussive:p, numChans:1).wait;
            // These two process() calls can happen together in their own threads because they don't depend on each other.
            FluidBufCompose.process(s, source:h, destination:result, destStartChan:0);
            FluidBufCompose.process(s, source:p, destination:result, destStartChan:1);

            // Then we sync the server so that the the result of both FluidBufCompose's is awaited on.
            s.sync; ("Finished"+file.fileName.asString).postln;

            /*
                                    FluidBufHPSS
                                         |
                                         |
                               ––––––––––––––––––––––
                               |                    |
                        FluidBufCompose (1)  FluidBufCompose (2)
                               |                    |
                               ––––––––––––––––––––––
                                         |
                                         |
                                       s.sync
            */

            // Associate the source file name (as a symbol) to the 2-channel result buffer.
            results.add(file.fileName.asSymbol -> result);

            counter = counter + 1;
            if (counter == wav.size, {
                condition.unhang;
            });
        });
    });

    condition.hang;

    "\nProcessing complete\n".postln;

    // This is the entire dictionary of results.
    results.keys.do({ |key|
        (key++": "++results[key].asString).postln;
    });
})
)