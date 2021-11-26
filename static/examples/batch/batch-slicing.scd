(
s.waitForBoot{

	Task{
		var drum = Buffer.read(s,File.realpath(FluidDataSet.class.filenameSymbol).dirname.withTrailingSlash ++ "../AudioFiles/Nicol-LoopE-M.wav");
		var slices = Buffer(s); // FluidBufAmpSlice will write into this buffer the samples at which slices are detected.
		var sliceAnalysis = Buffer(s); // a buffer for writing the analysis from FluidSpectralShape into
		var sliceCentroid = Buffer(s); // a buffer for writing the statistic analyses into
        var sliceStats = Buffer(s, 7); // a buffer that will be used to add points to the dataset - the analyses will be written into this buffer first
		var sliceMean = Buffer(s, 1);

        var data = FluidDataSet(s); // a data set for storing the analysis of each slice (mean centroid & mean loudness)

		s.sync;

		FluidBufOnsetSlice.process(s, drum, indices:slices, metric:9,threshold:0.5).wait;
		// slice the drums buffer based changes in the spectrum
		// the samples at which slices are detected will be written into the "slicepoints" buffer

		slices.loadToFloatArray(action:{ // bring the values in the slicepoints buffer from the server to the language as a float array
			arg slices_arr;
			slices_arr.postln;
			slices_arr.doAdjacentPairs{
				/*
				take each of the adjacent pairs and pass them to this function as an array of 2 values

				nb. for example [0,1,2,3,4] will execute this function 4 times, passing these 2 value arrays:
				[0,1]
				[1,2]
				[2,3]
				[3,4]

				this will give us each slice point *and* the next slice point so that we
				can tell the analyzers where to start analyzing and how many frames to analyze
				*/
				arg start, end, slice_index;
				var numsamps = end-start; // the next slice point minus the current one will give us the difference how many slices to analyze)

				slice_index.postln; // post which slice index we're currently analyzing

				// the ".wait"s will pause the Task (that this whole things is in) until the analysis is done;

				FluidBufSpectralShape.process(s, source:drum, startFrame:start, numFrames:numsamps, features:sliceAnalysis).wait;
				/* analyze the drum buffer starting at `start_samps` and for `num_samps` samples
				this returns a buffer (feautres_buf) that is 7 channels wide (for the 7 spectral analyses, see helpfile) and
				however many frames long as there are fft frames in the slice */

                FluidBufSelect.process(s, source:sliceAnalysis, destination:sliceCentroid, channels:0).wait;


				FluidBufStats.process(s, source:sliceCentroid, stats:sliceStats).wait;
				/* perform a statistical analysis the spectral analysis, doing only the first channel (specified by `numChans:1`)
				this will return just one channel because we asked it to analyze only 1 channel. that one channel will have 7 frames
				corresponding to the 7 statistical analyses that it performs */

				FluidBufSelect.process(s, source:sliceStats, destination:sliceMean, indices:0).wait;


				data.addPoint(slice_index, sliceMean);
				/* now that we've added the mean centroid and mean loudness into `point_buf`, we can use that buf to add the data that is in it to the dataset.
				we also need to give it an identifer. here we're calling it "point-%", where the "%" is replaced by the index of the slice */

				s.sync;
			};
		});
        data.print;
	}.play(AppClock);
}
)