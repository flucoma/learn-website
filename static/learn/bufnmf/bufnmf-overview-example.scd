s.boot;

// load the drum loop
~drums = Buffer.read(s, FluidFilesPath("Nicol-LoopE-M.wav"));

// take a listen
~drums.play;

// prepare some buffers
(
~resynth = Buffer(s);
~bases = Buffer(s);
~activations = Buffer(s);
~nComponents = 3;
)

// process using FluidBufNMF
FluidBufNMF.processBlocking(s, ~drums, resynth:~resynth, resynthMode: 1, bases:~bases, activations:~activations, components:~nComponents, action:{"done!".postln;});

// hear the resynth
(
Routine{
	~nComponents.do{
		arg i;
		"now playing component: %".format(i+1).postln;
		{
			var sig = PlayBuf.ar(~nComponents,~resynth,BufRateScale.kr(~resynth),doneAction:2)[i];
			sig.dup;
		}.play;
		~resynth.duration.wait;
		1.wait;
	};
}.play;
)

// see the bases and activations
~bases.plot;
~activations.plot;