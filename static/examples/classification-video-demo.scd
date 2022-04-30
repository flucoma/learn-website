~trombone = Buffer.read(s,FluidFilesPath("Olencki-TenTromboneLongTones-M.wav"));
~oboe = Buffer.read(s,FluidFilesPath("Harker-DS-TenOboeMultiphonics-M.wav"));

~trombone.play;
~oboe.play;

~trombone_train = Buffer.read(s,FluidFilesPath("Olencki-TenTromboneLongTones-M.wav"),0,1783040);
~oboe_train = Buffer.read(s,FluidFilesPath("Harker-DS-TenOboeMultiphonics-M.wav"),0,1783040);

~trombone_test = Buffer.read(s,FluidFilesPath("Olencki-TenTromboneLongTones-M.wav"),1783040);
~oboe_test = Buffer.read(s,FluidFilesPath("Harker-DS-TenOboeMultiphonics-M.wav"),1783040);


(
~nmfccs = 13;
~mfccbuf = Buffer.alloc(s,13);
~timbredata = FluidDataSet(s);
~labels = FluidLabelSet(s);
~counter = 0;
~realtime_analysis = {
	arg buf;
	{
		var sig = PlayBuf.ar(1,buf,BufRateScale.ir(buf),doneAction:2);
		var mfccs = FluidMFCC.kr(sig,~nmfccs,startCoeff:1,maxNumCoeffs:~nmfccs);
		FluidKrToBuf.kr(mfccs,~mfccbuf);
		sig.dup;
	}.play;
};
~add_point = {
	arg label;
	var id = "example-%".format(~counter);
	~timbredata.addPoint(id,~mfccbuf);
	~labels.addLabel(id,label);
	~counter = ~counter + 1;
};
)

~timbredata.print;
~labels.print;
~timbredata.clear;
~labels.clear;

// play the playback+analysis function with the trombone sound
~realtime_analysis.(~trombone_train);
// execute the add point function as many times as you want points
~add_point.("trombone");

// do the same with the oboe sound
~realtime_analysis.(~oboe_train);
// and add a similar number of points
~add_point.("oboe");

// create a classifier
(
~nn = FluidMLPClassifier(s,hidden:[5],activation:1,maxIter:1000,learnRate:0.1,momentum:0.9,batchSize:5,validation:0);
)

// run this fitting function for as long as the error is not acceptable
(
~nn.fit(~timbredata,~labels,{
	arg loss;
	loss.postln;
});
)

// define a querying function on the synth
(
~predictions = Buffer.alloc(s,1);
~server_predictions = {
	arg buf;
	OSCdef(\predictions,{
		arg msg;
		msg[3].postln;
	},"/prediction");
	{
		var sig = PlayBuf.ar(1,buf,BufRateScale.ir(buf),doneAction:2);
		var mfccs = FluidMFCC.kr(sig,~nmfccs,startCoeff:1,maxNumCoeffs:~nmfccs);
		var loudness = FluidLoudness.kr(sig)[0];
		var thresh = -40;
		var isPredicting = (loudness >= thresh);
		var trig = Impulse.kr(30);
		FluidKrToBuf.kr(mfccs,~mfccbuf);
		~nn.kr(trig * isPredicting,~mfccbuf,~predictions);
		SendReply.kr(trig * isPredicting,"/prediction",FluidBufToKr.kr(~predictions));
		SendReply.kr(trig * (1-isPredicting),"/prediction",-1);
		sig.dup;
	}.play;
};
)

// run it with trombone test sounds...
~server_predictions.(~trombone_test);
// ... and with oboe test sounds
~server_predictions.(~oboe_test);

// one could also query on the language side and get the label back as symbol
~realtime_analysis.(~trombone_test);
~realtime_analysis.(~oboe_test);

// execute the code below
(
~nn.predictPoint(~mfccbuf,{
arg label;
label.postln;
});
)