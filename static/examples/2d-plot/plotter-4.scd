// define this big function, then way down below, execute it
(
~twoD_instrument = {
	arg folder, sliceThresh = 0.05;
	fork{
		var loader = FluidLoadFolder(folder).play(s,{"done".postln;});
		var src, play_slice, analyses, normed, tree;
		var indices = Buffer(s);

		s.sync;

		if(loader.buffer.numChannels > 1){
			src = Buffer(s);
			FluidBufCompose.processBlocking(s,loader.buffer,startChan:0,numChans:1,destination:src,destStartChan:0,gain:-6.dbamp);
			FluidBufCompose.processBlocking(s,loader.buffer,startChan:1,numChans:1,destination:src,destStartChan:0,gain:-6.dbamp,destGain:1);
		}{
			src = loader.buffer
		};

		FluidBufOnsetSlice.processBlocking(s,src,metric:9,threshold:sliceThresh,indices:indices,action:{
			"done".postln;
			"average seconds per slice: %".format(src.duration / indices.numFrames).postln;
		});


		play_slice = {
			arg index;
			{
				var startsamp = Index.kr(indices,index);
				var stopsamp = Index.kr(indices,index+1);
				var phs = Phasor.ar(0,BufRateScale.ir(src),startsamp,stopsamp);
				var sig = BufRd.ar(1,src,phs);
				var dursecs = (stopsamp - startsamp) / BufSampleRate.ir(src);
				var env;

				dursecs = min(dursecs,1);

				env = EnvGen.kr(Env([0,1,1,0],[0.03,dursecs-0.06,0.03]),doneAction:2);
				sig.dup * env;
			}.play;
		};

		// analysis
		analyses = FluidDataSet(s);
		indices.loadToFloatArray(action:{
			arg fa;
			fork{
				var spec = Buffer(s);
				var stats = Buffer(s);
				var stats2 = Buffer(s);
				var loudness = Buffer(s);
				var point = Buffer(s);

				fa.doAdjacentPairs{
					arg start, end, i;
					var num = end - start;

					FluidBufSpectralShape.processBlocking(s,src,start,num,features:spec,select:[\centroid]);
					FluidBufStats.processBlocking(s,spec,stats:stats,select:[\mean]);

					FluidBufLoudness.processBlocking(s,src,start,num,features:loudness,select:[\loudness]);
					FluidBufStats.processBlocking(s,loudness,stats:stats2,select:[\mean]);

					FluidBufCompose.processBlocking(s,stats,destination:point,destStartFrame:0);
					FluidBufCompose.processBlocking(s,stats2,destination:point,destStartFrame:1);

					analyses.addPoint(i,point);

					"slice % / %".format(i,fa.size).postln;

					if((i%100) == 99){s.sync};
				};

				s.sync;

				analyses.print;
				normed = FluidDataSet(s);
				FluidNormalize(s).fitTransform(analyses,normed);

				normed.print;

				tree = FluidKDTree(s);
				tree.fit(normed);

				// plot
				normed.dump({
					arg dict;
					var point = Buffer.alloc(s,2);
					var previous = nil;
					dict.postln;
					defer{
						FluidPlotter(dict:dict,mouseMoveAction:{
							arg view, x, y;
							[x,y].postln;
							point.setn(0,[x,y]);
							tree.kNearest(point,1,{
								arg nearest;
								if(nearest != previous){
									nearest.postln;
									view.highlight_(nearest);
									play_slice.(nearest.asInteger);
									previous = nearest;
								}
							});
						});
					}
				});

			}
		});
	}
};
)

~twoD_instrument.(FluidFilesPath());