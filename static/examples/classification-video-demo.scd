~trombone = Buffer.read(s,File.realpath(FluidMLPClassifier.class.filenameSymbol).dirname.withTrailingSlash ++ "../AudioFiles/Olencki-TenTromboneLongTones-M.wav");
~oboe = Buffer.read(s,File.realpath(FluidMLPClassifier.class.filenameSymbol).dirname.withTrailingSlash ++ "../AudioFiles/Harker-DS-TenOboeMultiphonics-M.wav");

~trombone.play;
~oboe.play;

~trombone_train = Buffer.read(s,File.realpath(FluidMLPClassifier.class.filenameSymbol).dirname.withTrailingSlash ++ "../AudioFiles/Olencki-TenTromboneLongTones-M.wav",0,1783040);
~oboe_train = Buffer.read(s,File.realpath(FluidMLPClassifier.class.filenameSymbol).dirname.withTrailingSlash ++ "../AudioFiles/Harker-DS-TenOboeMultiphonics-M.wav",0,1783040);

~trombone_test = Buffer.read(s,File.realpath(FluidMLPClassifier.class.filenameSymbol).dirname.withTrailingSlash ++ "../AudioFiles/Olencki-TenTromboneLongTones-M.wav",1783040);
~oboe_test = Buffer.read(s,File.realpath(FluidMLPClassifier.class.filenameSymbol).dirname.withTrailingSlash ++ "../AudioFiles/Harker-DS-TenOboeMultiphonics-M.wav",1783040);

// FluidWaveform(~oboe_test);

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

~realtime_analysis.(~trombone_train);
~add_point.("trombone");

~realtime_analysis.(~oboe_train);
~add_point.("oboe");

(
~nn = FluidMLPClassifier(s,hidden:[5],activation:1,maxIter:1000,learnRate:0.1,momentum:0.9,batchSize:5,validation:0);
)

(
~nn.fit(~timbredata,~labels,{
	arg loss;
	loss.postln;
});
)

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

~server_predictions.(~trombone_test);
~server_predictions.(~oboe_test);

/*(
~nn.predictPoint(~mfccbuf,{
arg label;
label.postln;
});
)

~realtime_analysis.(~trombone_test);
~realtime_analysis.(~oboe_test);*/