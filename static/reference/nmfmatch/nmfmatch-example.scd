// for a longer explanation of these examples, visit: https://learn.flucoma.org/learn/nmfmatch

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
// play back the drums in real-time and watch the output of FluidNMFMatch
{
	var sig = PlayBuf.ar(1,~drums,BufRateScale.kr(~drums),doneAction:2);
	var match = FluidNMFMatch.kr(sig,~bases,~n_components);
	SendReply.kr(Impulse.kr(30),"/nmfmatch",match);
	sig.dup;
}.play;

~match = 0.dup(~n_components);
~win = Window("FluidNMFMatch",Rect(0,0,300,300));
~uv = UserView(~win,Rect(0,0,~win.bounds.width,~win.bounds.height));
~uv.drawFunc_{
	var width = ~uv.bounds.width / ~n_components;
	Pen.color_(Color.green);
	~match.do{ // iterate over the ~n_components values in the match array that are taken from FluidNMFMatch
		arg match_val, i;
		var match_norm = match_val.linlin(0,30,0,~uv.bounds.height); // make it a height appropriate for the window
		var top = ~uv.bounds.height - match_norm; // offset from the top so it looks like it's a bar rising from the bottom
		/*top.postln;*/
		Pen.addRect(Rect(i * width,top,width,match_norm)); // draw the rect
		Pen.draw;
	};
};

OSCdef(\nmfmatch,{
	arg msg;
	~match = msg[3..];
	{~win.refresh}.defer;
},"/nmfmatch");

~win.front;
)

// =================== compare with a different input ===================

~song = Buffer.readChannel(s,FluidFilesPath("Tremblay-beatRemember.wav"),channels:[0]);

(
// play back the song in real-time and watch the output of FluidNMFMatch
{
	var sig = PlayBuf.ar(1,~song,BufRateScale.kr(~song),doneAction:2);
	var match = FluidNMFMatch.kr(sig,~bases,~n_components);
	SendReply.kr(Impulse.kr(30),"/nmfmatch",match);
	sig.dup;
}.play;

~match = 0.dup(~n_components);
~win = Window("FluidNMFMatch",Rect(0,0,300,300));
~uv = UserView(~win,Rect(0,0,~win.bounds.width,~win.bounds.height));
~uv.drawFunc_{
	var width = ~uv.bounds.width / ~n_components;
	Pen.color_(Color.green);
	~match.do{ // iterate over the ~n_components values in the match array that are taken from FluidNMFMatch
		arg match_val, i;
		var match_norm = match_val.linlin(0,30,0,~uv.bounds.height); // make it a height appropriate for the window
		var top = ~uv.bounds.height - match_norm; // offset from the top so it looks like it's a bar rising from the bottom
		/*top.postln;*/
		Pen.addRect(Rect(i * width,top,width,match_norm)); // draw the rect
		Pen.draw;
	};
};

OSCdef(\nmfmatch,{
	arg msg;
	~match = msg[3..];
	{~win.refresh}.defer;
},"/nmfmatch");

~win.front;
)

// we can also use FluidNMFFilter to hear what the FluidNMFMatch outputs are corresponding to
(
Routine{
	~n_components.do{
		arg i;
		"audio output of FluidNMFFilter #%".format(i+1).postln;
		{
			var sig = PlayBuf.ar(1,~song,BufRateScale.kr(~song),doneAction:2);
			var filt = FluidNMFFilter.ar(sig,~bases,~n_components)[i];
			filt.dup;
		}.play;

		~song.duration.wait;
		1.wait;
	};
}.play;
)

// ============================== training on a subset of audio ===================================

// load the whole 22 second audio file
~golcar = Buffer.readChannel(s,FluidFilesPath("Tremblay-BaB-SoundscapeGolcarWithDog.wav"),channels:[0]);

// also load just the first 4 seconds that we'll use to train on.
~golcar4s = Buffer.readChannel(s,FluidFilesPath("Tremblay-BaB-SoundscapeGolcarWithDog.wav"),numFrames:~golcar.sampleRate * 4,channels:[0]);

// use just the 4 second buffer to do the FluidBufNMF analysis
FluidBufNMF.processBlocking(s,~golcar4s,bases:~bases,activations:~activations,resynth:~resynth,components:2,action:{"nmf done".postln;});

// check out the components
~resynth.play;

// check out the bases and activations
~bases.plot;
~activations.plot;

// use the bases to FluidNMFMatch against the whole 22 second file
(
{
	var sig = PlayBuf.ar(1,~golcar,BufRateScale.kr(~golcar),doneAction:2);
	var match = FluidNMFMatch.kr(sig,~bases,2);
	SendReply.kr(Impulse.kr(30),"/nmfmatch",match);
	sig.dup;
}.play;

~match = 0.dup(2);
~win = Window("FluidNMFMatch",Rect(0,0,200,200));
~uv = UserView(~win,Rect(0,0,~win.bounds.width,~win.bounds.height));
~uv.drawFunc_{
	var width = ~uv.bounds.width / 2;
	Pen.color_(Color.green);
	~match.do{ // iterate over the ~n_components values in the match array that are taken from FluidNMFMatch
		arg match_val, i;
		var match_norm = match_val.linlin(0,30,0,~uv.bounds.height); // make it a height appropriate for the window
		var top = ~uv.bounds.height - match_norm; // offset from the top so it looks like it's a bar rising from the bottom
		/*top.postln;*/
		Pen.addRect(Rect(i * width,top,width,match_norm)); // draw the rect
		Pen.draw;
	};
};

OSCdef(\nmfmatch,{
	arg msg;
	~match = msg[3..];
	{~win.refresh}.defer;
},"/nmfmatch");

~win.front;
)