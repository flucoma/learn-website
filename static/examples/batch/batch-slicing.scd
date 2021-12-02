// Refer to https://learn.flucoma.org/overviews/batch-processing
(
s.waitForBoot({
    fork({
        var drum = Buffer.read(s,File.realpath(FluidDataSet.class.filenameSymbol).dirname.withTrailingSlash ++ "../AudioFiles/Nicol-LoopE-M.wav");
        var slices = Buffer(s); // The slicer (FluidBufOnsetSlice) will write into this buffer the samples at which slices are detected
        var sliceAnalysis = Buffer(s); // A Buffer() for writing the analysis from FluidSpectralShape into
        var sliceCentroid = Buffer(s); // A Buffer() for extracting the centroid into
        var sliceStats = Buffer(s, 7); // A Buffer() for writing the statistical analyses of the centroid into
        var sliceMean = Buffer(s, 1); // A Buffer() for extracting just the mean from the 7 statistical analyses.

        var data = FluidDataSet(s); // A FluidDataSet() for storing the analysis of each slice (mean centroid)

        // Slice the drum Buffer() based on consecutive changes in spectral frames
        // The samples at which slices are detected will be written into the "slices" Buffer()
        FluidBufOnsetSlice.processBlocking(s, drum, indices:slices, metric:9,threshold:0.5);
        s.sync;

        slices.loadToFloatArray(action:{ |slicesArr| // bring the values in the slices buffer from the server to the language as a float array
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
                var numSamps = end-start; // The next slice point minus the current one will determine how many frames to analyse.

                /*
                Using .processBlocking we control the flow of analysis as it is extracted and further analysed.
                Analyse the drum buffer starting at `start` and for a number of samples equal to `numsamps`
                This returns a buffer (sliceAnalysis) that is 7 channels wide (for the 7 spectral analyses) and
                however many frames long as there are fft frames in the slice.
                */

                sliceIndex.postln; // Post which slice index we're currently working on

                // Calculate the spectral shape descriptor for the segment.
                // This produces a 7 channel buffer with as many samples as there are analysis windows.
                // Each channel is a different spectral descriptor (see the help file).
                FluidBufSpectralShape.processBlocking(s, source:drum, features:sliceAnalysis, startFrame:start, numFrames:numSamps, action:{
                    // Calculate the stats on only the first channel (spectral centroid).
                    FluidBufStats.processBlocking(s, source:sliceAnalysis, stats:sliceStats, numChans:1, action:{
                        // Select only the first value from the 7 statistics.
                        // Put that value into a 1 channel by 1 sample buffer.
                        FluidBufSelect.processBlocking(s, source:sliceStats, destination:sliceMean, indices:0, action:{
                            // Add the contents of the sliceMean buffer to the DataSet with an identifier which is the slice index.
                            data.addPoint(sliceIndex, sliceMean);
                        });
                    });
                });
                s.sync;
            });
        });
        s.sync;

        // Free buffers
        sliceAnalysis.free; sliceCentroid.free; sliceStats.free; sliceMean.free;

        // Print the contents of the DataSet
        data.print;
    });
});
)