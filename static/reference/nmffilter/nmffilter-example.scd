// for a longer explanation of these examples, visit: https://learn.flucoma.org/overviews/nmfmatch

(
// load the drum loop and create some buffers for our nmf analysis
~drums = Buffer.read(s,FluidFilesPath("Nicol-LoopE-M.wav"));
~bases = Buffer(s);
~activations = Buffer(s);
~n_components = 3;
)

// do the nmf analysis to get the bases
FluidBufNMF.processBlocking(s,~drums,bases:~bases,activations:~activations,components:~n_components,action:{"nmf done".postln;});

// check out the bases
~bases.plot;

(
// play back the drums in real-time and hear the different outputs of NMFFilter
~synth = {
	arg which = 0;
	var sig = PlayBuf.ar(1,~drums,BufRateScale.kr(~drums),loop:1);
	sig = FluidNMFFilter.ar(sig,~bases,~n_components);
	sig = Select.ar(which,sig);
	sig.dup;
}.play;
)

~synth.set(\which,0); // audio output stream based on basis #1
~synth.set(\which,1); // audio output stream based on basis #2
~synth.set(\which,2); // audio output stream based on basis #3

// =================== compare with a different input ===================

~song = Buffer.readChannel(s,FluidFilesPath("Tremblay-beatRemember.wav"),channels:[0]);

(
// play back the song in real-time and watch the output of FluidNMFMatch
~synth = {
	arg which = 0;
	var sig = PlayBuf.ar(1,~song,BufRateScale.kr(~song),loop:1);
	sig = FluidNMFFilter.ar(sig,~bases,~n_components);
	sig = Select.ar(which,sig);
	sig.dup;
}.play;
)

~synth.set(\which,0); // audio output stream based on basis #1
~synth.set(\which,1); // audio output stream based on basis #2
~synth.set(\which,2); // audio output stream based on basis #3

// =============== filtering noise ===========================

(
// play back the song in real-time and watch the output of FluidNMFMatch
~synth = {
	arg which = 0;
	var sig = PinkNoise.ar(-10.dbamp);
	sig = FluidNMFFilter.ar(sig,~bases,~n_components);
	sig = Select.ar(which,sig);
	sig.dup;
}.play;
)

~synth.set(\which,0); // audio output stream based on basis #1
~synth.set(\which,1); // audio output stream based on basis #2
~synth.set(\which,2); // audio output stream based on basis #3