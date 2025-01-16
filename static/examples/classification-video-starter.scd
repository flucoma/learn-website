~trombone = Buffer.read(s,FluidFilesPath("Olencki-TenTromboneLongTones-M.wav"));
~oboe = Buffer.read(s,FluidFilesPath("Harker-DS-TenOboeMultiphonics-M.wav"));

~trombone.play;
~oboe.play;

~trombone_train = Buffer.read(s,FluidFilesPath("Olencki-TenTromboneLongTones-M.wav"),0,1783040);
~oboe_train = Buffer.read(s,FluidFilesPath("Harker-DS-TenOboeMultiphonics-M.wav"),0,1783040);

~trombone_test = Buffer.read(s,FluidFilesPath("Olencki-TenTromboneLongTones-M.wav"),1783040);
~oboe_test = Buffer.read(s,FluidFilesPath("Harker-DS-TenOboeMultiphonics-M.wav"),1783040);

// create a classifier
(
~nn = FluidMLPClassifier(s,hidden:[5],activation:1,maxIter:1000,learnRate:0.1,momentum:0.9,batchSize:5,validation:0);
)