// Refer to https://learn.flucoma.org/overviews/batch-processing
(
s.waitForBoot({
    var drum = Buffer.read(s,File.realpath(FluidDataSet.class.filenameSymbol).dirname.withTrailingSlash ++ "../AudioFiles/Nicol-LoopE-M.wav");
    var slices = Buffer(s); // The slicer (FluidBufOnsetSlice) will write into this buffer the samples at which slices are detected
    var data = FluidDataSet(s); // A FluidDataSet() for storing the analysis of each slice (mean centroid)

    // Create a condition that hangs while processing is still happening and unhangs when its complete.
    var processingCompleted = Condition();

    // Create a Semaphore that allows 4 concurrent jobs, and will manage a queue of waiting jobs for us.
    var pool = Semaphore(4);

    // Slice the drum Buffer() based on consecutive changes in spectral frames
    // The samples at which slices are detected will be written into the "slices" Buffer()
    // note that we call wait(), as a convinience to block until the slicing has completed
    FluidBufOnsetSlice.process(s, drum, indices:slices, metric:9,threshold:0.5).wait;

    slices.loadToFloatArray(action:{ |slicesArr| // Bring the values in the slices buffer from the server to the language as a float array
        /*
        If the last slice index is not the true end of the source file (in samples), we append it.
        This ensures that the final segment which is analysed goes from the last calculated index, to the end of the file.
        */
        if ((slicesArr.at(slicesArr.size) != drum.numFrames), {
            slicesArr = slicesArr.add(drum.numFrames);
        });
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
            fork({
                var sliceAnalysis, sliceCentroid, sliceStats, sliceMean, numSamps;
                pool.wait; // We ask the semaphore if we can proceed (i.e. < 4 jobs currently processing) It will block until we are able to go
                sliceAnalysis = Buffer(s); // A Buffer() for writing the analysis from FluidSpectralShape into
                sliceCentroid = Buffer(s); // A Buffer() for extracting the centroid into
                sliceStats = Buffer(s, 7); // A Buffer() for writing the statistical analyses of the centroid into
                sliceMean = Buffer(s, 1); // A Buffer() for extracting just the mean from the 7 statistical analyses.

                s.sync;

                numSamps = end-start; // The next slice point minus the current one will determine how many frames to analyse.

                // Analyse the drum buffer starting at `start` and for a number of samples equal to `numsamps`
                // Calculate the spectral shape descriptor for the segment.
                // This produces a 7 channel buffer with as many samples as there are analysis windows.
                // Each channel is a different spectral descriptor (see the help file).
                FluidBufSpectralShape.process(s, source:drum, features:sliceAnalysis, startFrame:start, numFrames:numSamps, action:{
                    // Calculate the stats on only the first channel (spectral centroid).
                    FluidBufStats.process(s, source:sliceAnalysis, stats:sliceStats, numChans:1, action:{
                        // Select only the first value from the 7 statistics.
                        // Put that value into a 1 channel by 1 sample buffer.
                        FluidBufSelect.process(s, source:sliceStats, destination:sliceMean, indices:0,action:{
                            // Now that we have a 1x1 Buffer() holding the mean centroid for that segment we can add it to the FluidDataSet.
                            data.addPoint(sliceIndex, sliceMean);

                            // Free buffers
                            sliceAnalysis.free; sliceCentroid.free; sliceStats.free; sliceMean.free;

                            // The segments will be started in order but they won't necessarily finish in order.
                            // Theoretically, the shortest (fastest to process) will return sooner and so the order should be jumbled in the console.
                            // The slices which are started have an advantage, however.
                            ("Finished Processing Slice Index:"+sliceIndex.asString).postln;

                            // Check how many items are in the DataSet.
                            // If there are the same number of items in the DataSet as there are items we wanted to process unhang the Condition
                            data.size(action:{ |size|
                                if (size == (slicesArr.size-1)) { processingCompleted.unhang }
                            });
                            // Tell the pool that we are finished
                            pool.signal;
                        })
                    })
                });
            });
        });
    });

    // The code inside the fork executes immediately after slices.loadToFloatArray (which is non-blocking)
    // At this point FluCoMa will be processing all of the slices in a batch.
    // The interpreter then moves to processingCompleted.hang which will stall until processingCompleted.unhang is called.
    // When the last item in the fork is processed this is called (see line 69).
    processingCompleted.hang;

    "\nProcessing complete\n".postln;
    data.print;
});
)