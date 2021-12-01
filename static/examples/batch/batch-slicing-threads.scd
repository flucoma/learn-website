// Refer to https://learn.flucoma.org/overviews/batch-processing
(
s.waitForBoot({
    var drum = Buffer.read(s,File.realpath(FluidDataSet.class.filenameSymbol).dirname.withTrailingSlash ++ "../AudioFiles/Nicol-LoopE-M.wav");
    var slices = Buffer(s); // The slicer (FluidBufOnsetSlice) will write into this buffer the samples at which slices are detected
    var data = FluidDataSet(s); // A FluidDataSet() for storing the analysis of each slice (mean centroid)

    // Create a condition that hangs while processing is still happening and unhangs when its complete.
    var processingCompleted = Condition();
    var counter = 0; // Also keep track of how many slices we have processed.
    s.sync;

    // Slice the drum Buffer() based on consecutive changes in spectral frames
    // The samples at which slices are detected will be written into the "slices" Buffer()
    FluidBufOnsetSlice.processBlocking(s, drum, indices:slices, metric:9,threshold:0.5);

    slices.loadToFloatArray(action:{ |slicesArr| // Bring the values in the slices buffer from the server to the language as a float array
        slicesArr.postln;
        slicesArr.doAdjacentPairs({ |start, end, sliceIndex|
            /*
            Take each of the adjacent pairs and pass them to this function as an array of 2 values

            For example, [0,1,2,3,4] will execute this function 4 times, passing these 2 value arrays:
            [0,1]
            [1,2]
            [2,3]
            [3,4]

            This will give us the left and right boundary of each segment
            We can use this to inform the analysis (FluidBufSpectralShape) where to start analysing and how many frames to analyse
            */

            fork ({
                var sliceAnalysis = Buffer(s); // A Buffer() for writing the analysis from FluidSpectralShape into
                var sliceCentroid = Buffer(s); // A Buffer() for extracting the centroid into
                var sliceStats = Buffer(s, 7); // A Buffer() for writing the statistical analyses of the centroid into
                var sliceMean = Buffer(s, 1); // A Buffer() for extracting just the mean from the 7 statistical analyses.

                var numsamps = end-start; // The next slice point minus the current one will determine how many frames to analyse.

                // Analyse the drum buffer starting at `start` and for a number of samples equal to `numsamps`
                /*
                This returns a buffer (sliceAnalysis) that is 7 channels wide (for the 7 spectral analyses) and
                however many frames long as there are fft frames in the slice.
                */
                FluidBufSpectralShape.process(s, source:drum, startFrame:start, numFrames:numsamps, features:sliceAnalysis).wait;


                // We extract only the first channel of the 7 channels (the centroid) and put it into a Buffer() named sliceCentroid
                FluidBufSelect.process(s, source:sliceAnalysis, destination:sliceCentroid, channels:0).wait;

                // Then calculate the statistical analyses of the centroid for each segment.
                // This will return write the output into a new Buffer() called sliceStats that will be 1 channel and 7 frames in size.
                FluidBufStats.process(s, source:sliceCentroid, stats:sliceStats).wait;

                // Then extract only the first frame from the 7 frames and write it into a Buffer() called sliceMean.
                // This isolates a singular value, the average spectral centroid for the segment.
                FluidBufSelect.process(s, source:sliceStats, destination:sliceMean, indices:0).wait;

                // Now that we have a 1x1 Buffer() holding the mean centroid for that segment we can add it to the FluidDataSet.
                data.addPoint(sliceIndex, sliceMean);
                s.sync;
                counter = counter + 1;

                // The segments will be started in order but they won't necessarily finish in order.
                // Theoretically, the shortest (fastest to process) will return sooner and so the order should be jumbled in the console.
                // The slices which are started have an advantage however.
                ("Finished Processing Slice Index:"+sliceIndex).postln;
                if (counter == (slicesArr.size-1) , {
                    processingCompleted.unhang;
                });
            });
        });
    });
    /*
    The code inside the fork executes immediately in a non-blocking way.
    At this point FluCoMa will be processing all of the slices in a batch.
    The interpreter then moves to processingCompleted.hang which will stall until processingCompleted.unhang is called.
    When the last item in the fork is processed this is called (see line 69).
    */
    processingCompleted.hang;

    "\nProcessing complete\n".postln;
    data.print;
});
)