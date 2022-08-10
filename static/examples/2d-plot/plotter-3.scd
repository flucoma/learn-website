// this audio file comes with the flucoma toolkit
~src = Buffer.read(s,FluidFilesPath("Nicol-LoopE-M.wav"));

// what does it sound like
~src.play;

// slice the buffer in non real-time
(
~indices = Buffer(s);
FluidBufOnsetSlice.processBlocking(s,~src,metric:9,threshold:0.05,indices:~indices,action:{"done".postln});
)

// how many slice points has it found
~indices.postln;

// a function to play back and individual slice point
(
~play_slice = {
	arg index;
	{
		var startsamp = Index.kr(~indices,index);
		var stopsamp = Index.kr(~indices,index+1);
		var phs = Phasor.ar(0,BufRateScale.ir(~src),startsamp,stopsamp);
		var sig = BufRd.ar(1,~src,phs);
		var dursecs = (stopsamp - startsamp) / BufSampleRate.ir(~src);
		var env = EnvGen.kr(Env([0,1,1,0],[0.03,dursecs-0.06,0.03]),doneAction:2);
		sig.dup * env;
	}.play;
};
)

// analysis
(
~analyses = FluidDataSet(s);
~indices.loadToFloatArray(action:{
	arg fa;
	var spec = Buffer(s);
	var stats = Buffer(s);
	var stats2 = Buffer(s);
	var loudness = Buffer(s);
	var point = Buffer(s);

	fa.doAdjacentPairs{
		arg start, end, i;
		var num = end - start;

		FluidBufSpectralShape.processBlocking(s,~src,start,num,features:spec,select:[\centroid]);
		FluidBufStats.processBlocking(s,spec,stats:stats,select:[\mean]);

		FluidBufLoudness.processBlocking(s,~src,start,num,features:loudness,select:[\loudness]);
		FluidBufStats.processBlocking(s,loudness,stats:stats2,select:[\mean]);

		FluidBufCompose.processBlocking(s,stats,destination:point,destStartFrame:0);
		FluidBufCompose.processBlocking(s,stats2,destination:point,destStartFrame:1);

		~analyses.addPoint(i,point);
	};

	s.sync;

	~analyses.print;
});
)

// normalize
(
~normed = FluidDataSet(s);
FluidNormalize(s).fitTransform(~analyses,~normed);
)

// fit a kdtree
~tree = FluidKDTree(s).fit(~normed);

// plot
(
~normed.dump({
	arg dict;
	var point = Buffer.alloc(s,2);
	var previous = nil;
	dict.postln;
	defer{
		FluidPlotter(dict:dict,mouseMoveAction:{
			arg view, x, y;
			[x,y].postln;
			point.setn(0,[x,y]);
			~tree.kNearest(point,1,{
				arg nearest;
				if(nearest != previous){
					nearest.postln;
					view.highlight_(nearest);
					~play_slice.(nearest.asInteger);
					previous = nearest;
				}
			});
		});
	}
});
)