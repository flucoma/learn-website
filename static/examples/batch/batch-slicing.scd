(
s.waitForBoot{

	Task{
		var buf = Buffer.read(s,File.realpath(FluidDataSet.class.filenameSymbol).dirname.withTrailingSlash ++ "../AudioFiles/Nicol-LoopE-M.wav");
		var slicepoints = Buffer(s); // FluidBufAmpSlice will write into this buffer the samples at which slices are detected.
		var features_buf = Buffer(s); // a buffer for writing the analysis from FluidSpectralShape into
		var stats_buf = Buffer(s); // a buffer for writing the statistic analyses into
		var point_buf = Buffer(s,2); // a buffer that will be used to add points to the dataset - the analyses will be written into this buffer first
		var ds = FluidDataSet(s); // a data set for storing the analysis of each slice (mean centroid & mean loudness)
		var scaler = FluidNormalize(s); // a tool for normalizing a dataset (making it all range between zero and one)
		var kdtree = FluidKDTree(s); // a kdtree for fast nearest neighbour lookup

		s.sync;

		FluidBufOnsetSlice.process(s,buf,indices:slicepoints,metric: 9,threshold: 0.5).wait;
		// slice the drums buffer based changes in the spectrum
		// the samples at which slices are detected will be written into the "slicepoints" buffer

		slicepoints.loadToFloatArray(action:{ // bring the values in the slicepoints buffer from the server to the language as a float array
			arg slicepoints_arr;
			slicepoints_arr.postln;
			slicepoints_arr.doAdjacentPairs{
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
				arg start_samps, end_samps, slice_index;
				var num_samps = end_samps - start_samps; // the next slice point minus the current one will give us the difference how many slices to analyze)

				slice_index.postln; // post which slice index we're currently analyzing

				// the ".wait"s will pause the Task (that this whole things is in) until the analysis is done;

				FluidBufSpectralShape.process(s,buf,start_samps,num_samps,features:features_buf).wait;
				/* analyze the drum buffer starting at `start_samps` and for `num_samps` samples
				this returns a buffer (feautres_buf) that is 7 channels wide (for the 7 spectral analyses, see helpfile) and
				however many frames long as there are fft frames in the slice */

				FluidBufStats.process(s,features_buf,numChans:1,stats:stats_buf).wait;
				/* perform a statistical analysis the spectral analysis, doing only the first channel (specified by `numChans:1`)
				this will return just one channel because we asked it to analyze only 1 channel. that one channel will have 7 frames
				corresponding to the 7 statistical analyses that it performs */

				FluidBufCompose.process(s,stats_buf,0,1,destination:point_buf,destStartFrame:0).wait;
				/* FluidBufCompose is essentially a "buf copy" operation. this will copy just the zeroth frame from `stats_buf` (mean)
				into the zeroth buf of `point_buf` which is what we'll evenutally use to add the data to the dataset */

				FluidBufLoudness.process(s,buf,start_samps,num_samps,features:features_buf).wait;
				// do a loudness analysis

				FluidBufStats.process(s,features_buf,numChans:1,stats:stats_buf).wait;
				// see above

				FluidBufCompose.process(s,stats_buf,0,1,destination:point_buf,destStartFrame:1).wait;
				/* see above, but this time the mean loudnessi s being copied into the 1st frame of `point_buf` so that it doesn't overwrite the mean centroid */

				ds.addPoint(slice_index,point_buf);
				/* now that we've added the mean centroid and mean loudness into `point_buf`, we can use that buf to add the data that is in it to the dataset.
				we also need to give it an identifer. here we're calling it "point-%", where the "%" is replaced by the index of the slice */

				s.sync;
			};
		});
        ds.print;
	}.play(AppClock);
}
)