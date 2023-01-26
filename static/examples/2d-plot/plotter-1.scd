// this audio file comes with the flucoma toolkit
~src = Buffer.read(s,FluidFilesPath("Nicol-LoopE-M.wav"));

// what does it sound like
~src.play;

// use the real-time version of the slicer to tweak parameters
(
{
	var sig = PlayBuf.ar(1,~src,BufRateScale.ir(~src),loop:1);
	var slices = FluidOnsetSlice.ar(sig,9,0.5);
	[sig,slices]
}.play;
)

// slice the buffer in non real-time
(
~indices = Buffer(s);
FluidBufOnsetSlice.processBlocking(s,~src,metric:9,threshold:0.5,indices:~indices,action:{"done".postln});
)

// how many slice points has it found
~indices.postln;

// the slice points are in samples
(
~indices.loadToFloatArray(action:{
	arg fa;
	fa.postln;
	fa.size.postln;
});
)

FluidWaveform(~src,~indices);

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

// loop through all the slice points, playing them one at a time
(
fork{
	(~indices.numFrames - 1).do{
		arg i;
		~play_slice.(i);
		1.wait;
	};
}
)