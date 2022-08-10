(
Window.closeAll;
s.waitForBoot{
	var synth, multislider, win, xyslider;
	var xydata = FluidDataSet(s);
	var paramsdata = FluidDataSet(s);
	var xybuf = Buffer.alloc(s,2);
	var paramsbuf = Buffer.alloc(s,10);
	var counter = 0;

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
		paramsbuf.setn(0,ms.value);
	})
	.value_(0.5.dup(10));

	xyslider = Slider2D(win,Rect(420,10,300,300))
	.action_{
		arg view;
		xybuf.setn(0,[view.x,view.y]);
	};

	Button(win,Rect(730,10,100,20))
	.states_([["Add Points"]])
	.action_{
		var id = "point-%".format(counter);
		xydata.addPoint(id,xybuf);
		paramsdata.addPoint(id,paramsbuf);
		counter = counter + 1;

		xydata.print;
		paramsdata.print;
	};

	Button(win,Rect(730,40,100,20))
	.states_([["Save Data"]])
	.action_{
		FileDialog({
			arg folder;
			xydata.write(folder+/+"xydata.json");
			paramsdata.write(folder+/+"paramsdata.json");
		},{},2,0,true);
	};

	Button(win,Rect(730,70,100,20))
	.states_([["Load Data"]])
	.action_{
		FileDialog({
			arg folder;
			xydata.read(folder+/+"xydata.json");
			paramsdata.read(folder+/+"paramsdata.json");
		},fileMode:2,acceptMode:0,stripResult:true);
	};

	Button(win,Rect(730,100,100,20))
	.states_([["Train"]])
	.action_{
		mlp.fit(xydata,paramsdata,{
			arg loss;
			loss.postln;
		});
	};

	Button(win,Rect(730,130,100,20))
	.states_([["Save MLP"]])
	.action_{
		Dialog.savePanel({
			arg path;
			if(PathName(path).extension != "json"){
				path = "%.json".format(path);
			};
			mlp.write(path);
		});
	};

	Button(win,Rect(730,160,100,20))
	.states_([["Load MLP"]])
	.action_{
		Dialog.openPanel({
			arg path;
			mlp.read(path);
		});
	};

	Button(win,Rect(730,190,100,20))
	.states_([["Not Predicting"],["Predicting"]])
	.action_{
		arg but;
		synth.set(\predicting,but.value);
	};

	s.sync;

	synth = {
		arg predicting = 0;
		var osc1, osc2, feed1, feed2, base1=69, base2=69, base3 = 130, loud1, loud2;
		var val, xy, trig;

		xy = FluidBufToKr.kr(xybuf);
		trig = Mix(Changed.kr(xy));
		mlp.kr(trig * predicting,xybuf,paramsbuf);
		val = FluidBufToKr.kr(paramsbuf);
		SendReply.kr(Mix(Changed.kr(val)),"/paramsChanged",val);

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

	OSCdef(\paramsChanged,{
		arg msg;
		defer{
			multislider.value_(msg[3..]);
		};
	},"/paramsChanged");
};
)