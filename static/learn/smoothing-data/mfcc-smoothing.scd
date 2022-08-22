(
s.waitForBoot({
    ~src = Buffer.read(s,FluidFilesPath("Nicol-LoopE-M.wav"));
})
)

(
~player = ({
    var sig = PlayBuf.ar(1,~src,BufRateScale.ir(~src), loop:1);
    var mfcc = FluidMFCC.kr(sig); // outputs 2 analyses: frequency and confidence
    var stats = FluidStats.kr(mfcc, 10);
    var means = stats[0]; // stats index 0 is an array of the means
    var out = Out.ar([0, 1], sig);
    SendReply.kr(Impulse.kr(30), "/mfccs", means);
}).play;
)

(
~win = Window("MFCCs Monitor", Rect(0,0,800,400)).front;
~ms = MultiSliderView(~win, Rect(0,0,~win.bounds.width,~win.bounds.height)).elasticMode_(1).isFilled_(1);
~ms.reference_(Array.fill(13, {0.5})); //make a center line to show 0
~slider = Slider(~win, Rect(0, 0, 150, 20))
.action_({
    ~stats.history_(~slider.value);
    (~slider.value * 127).postln;
});

OSCdef(\mfccs,{
    arg msg;
    {~ms.value_(msg[3..].linlin(-50, 50, 0, 1))}.defer;
},"/mfccs");
)

