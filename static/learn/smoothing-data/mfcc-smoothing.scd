// Boot Server and wait for the buffer to load
(
s.waitForBoot({
    ~src = Buffer.read(s,FluidFilesPath("Nicol-LoopE-M.wav"));
})
)

// Start a basic playback synth with MFCC analysis and FluidStats smoothing
(
~synth = {
    var sig = PlayBuf.ar(1, \src.kr, BufRateScale.ir(\src.kr), loop:1);
    var mfcc = FluidMFCC.kr(sig);
    var stats = FluidStats.kr(mfcc, 10, history: \history.kr(10));
    var means = stats[0]; // stats index 0 is an array of the means
    SendReply.kr(Impulse.kr(30), "/mfccs", means);
    Out.ar([0, 1], sig);
}.play;
)

// Visualise and control the smoothing of the MFCC data.
(
~win = Window("MFCCs Monitor", Rect(0,0,800,400)).front;
~ms = MultiSliderView(~win, Rect(0,0,~win.bounds.width,~win.bounds.height)).elasticMode_(1).isFilled_(1);
~ms.reference_(Array.fill(13, {0.5})); //make a center line to show 0
~slider = Slider(~win, Rect(0, 0, 150, 20)).action_({
    ~synth.set(\history, ~slider.value * 127);
});

OSCdef(\mfccs,{
    arg msg;
    {~ms.value_(msg[3..].linlin(-50, 50, 0, 1))}.defer;
},"/mfccs");
)