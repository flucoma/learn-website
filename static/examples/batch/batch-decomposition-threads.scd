(
s.reboot;
s.waitForBoot({
    // Store the location of the FluCoMa audio files in the audioFiles variable
    var audioFiles = PathName(File.realpath(FluidDataSet.class.filenameSymbol).dirname.withTrailingSlash ++ "../AudioFiles/");
    // Create a dictionary that will contain the resulting buffer, associated to a string which represents the original source file
    var results = Dictionary.new;

    // Create a condition that hangs while processing is still happening and unhangs when its complete.
    var processingCompleted = Condition();

    // Remove any files from the audioFiles collection so that only those with a .wav extension remain
    var wav = audioFiles.files.select({ |file| file.extension == "wav" });

    // Create a Semaphore that allows 4 consecutive jobs
    // You should experiment and play with this value to see how the number of workers changes the speed of result
    var pool = Semaphore(4);

    var t = SystemClock.seconds;

    // In the language iterate over all the files in the example audio files directory
    wav.do({ |file|
        fork({
            var src, h, p, result;
            pool.wait;
            /*
            This tells indicates to the Semaphore that we'd like to queue up this portion of the work with one of the workers.'
            If 1 of the 4 workers are avaialble it will process, otherwise it'll have to wait till something is available.
            */
            src = Buffer.read(s, file.fullPath.asString);
            // Create two buffers, h and p for the harmonic and percussive outputs respectively
            h = Buffer.new(s);
            p = Buffer.new(s);
            // Create a new buffer that we will compose into so harmonic and percussive exist in a two-channel buffer, rather than two separate mono buffers.
            result = Buffer.new(s);

            s.sync;

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
            pool.signal; // We the notify the Semaphore that this worker from the pool is done and can be used for someting else.Bra

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
                processingCompleted.unhang;
            });
            pool.signal; // We the notify the Semaphore that this worker from the pool is done and can be used for someting else.Bra
        });
    });

    processingCompleted.hang;

    t = SystemClock.seconds - t;

    ("\nProcessing complete in" + t.asString + "seconds\n").postln;

    // This is the entire dictionary of results.
    results.keys.do({ |key|
        (key++": "++results[key].asString).postln;
    });
});
)