(
s.waitForBoot{
    Task{
        // Store the location of the FluCoMa audio files in the audioFiles variable
        var audioFiles= PathName(File.realpath(FluidDataSet.class.filenameSymbol).dirname.withTrailingSlash ++ "../AudioFiles/");
        // Create a dictionary that will contain the resulting buffer, associated to a string which represents the original source file
        var results = Dictionary.new;

        // In the language iterate over all the files in the example audio files directory
        audioFiles.filesDo({
            arg file; // Individual file paths are now this variable
            if ((file.extension == "wav"), { // Only process wav files
                var src = Buffer.read(s, file.fullPath.asString); // Create a buffer with the source audio in a buffer called "src"
                // Create two buffers, h and p for the harmonic and percussive outputs respectively
                var h = Buffer.new(s);
                var p = Buffer.new(s);
                // Create a new buffer that we will compose into so harmonic and percussive exist in a two-channel buffer, rather than two separate mono buffers.
                var result = Buffer.new(s);

                ("Processing:"+file.fileName.asString).postln;
                // Do the HPSS processing. Only process the first channel to simplify things when we process a stereo file.
                FluidBufHPSS.process(s, source:src, harmonic:h, percussive:p, numChans:1).wait;
                FluidBufCompose.process(s, source:h, destination:result, destStartChan:0).wait;
                FluidBufCompose.process(s, source:p, destination:result, destStartChan:1).wait;

                // Associate the source file name (as a symbol) to the 2-channel result buffer.
                results.add(file.asSymbol -> result);
            });
        });
        // This is the entire dictionary of results.
        results.postln;
    }.play(AppClock);
}
)