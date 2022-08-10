(
Window.closeAll;
s.waitForBoot{
	var synth, multislider, win, xyslider;
	var controlBus = Bus.control(s,10);

	var mlp = FluidMLPRegressor(s,
		[7],
		activation:FluidMLPRegressor.sigmoid,
		outputActivation:FluidMLPRegressor.sigmoid,
		maxIter: 1000,
		learnRate:0.1,
		batchSize:1,
		validation:0
	);

	win = Window("ChaosSynth", Rect(10, 10, 840, 320)).front;

	multislider = MultiSliderView(win,Rect(10, 10, 400, 300))
	.elasticMode_(1)
	.isFilled_(1)
	.action_({
		arg ms;
		controlBus.setn(ms.value);
	})
	.value_(0.5.dup(10));

	xyslider = Slider2D(win,Rect(420,10,300,300))
	.action_{
		arg view;
	};

	s.sync;

	synth = {
		var val = In.kr(controlBus,10);
		var osc1, osc2, feed1, feed2, base1=69, base2=69, base3 = 130, loud1, loud2;
		#feed2, feed1 = LocalIn.ar(2);

		loud1 = FluidLoudness.kr(feed1,[\loudness],1,0,hopSize:64);
		loud2 = FluidLoudness.kr(feed2,[\loudness],1,0,hopSize:64);

		osc1 = SinOsc.ar((((feed1 * val[0]) +  val[1]) * base1).midicps,mul:(val[2] * 50).dbamp).atan;
		osc1 = MoogFF.ar(osc1,(base3-(val[3]*(loud2.clip(-120,0)+120))).lag(128/44100).midicps,val[4]*3.5);

		osc2 = SinOsc.ar((((feed2 * val[5]) +  val[6]) * base2).midicps,mul: (val[7] * 50).dbamp).atan;
		osc2 = MoogFF.ar(osc2,(base3-(val[8]*(loud1.clip(-120,0)+120))).lag(128/44100).midicps,val[9]*3.5);

		Out.ar(0,LeakDC.ar([osc1,osc2],mul:0.1));
		LocalOut.ar([osc1,osc2]);
	}.play;
};
)