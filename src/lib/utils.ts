function logslider(position, imin, imax, omin, omax) {
	// position will be between 0 and 100
	var minp = imin;
	var maxp = imax;

	// The result should be between 100 an 10000000
	var minv = Math.log(omin);
	var maxv = Math.log(omax);

	// calculate adjustment factor
	var scale = (maxv - minv) / (maxp - minp);

	return Math.exp(minv + scale * (position - minp));
}

function binToHz(bin: number, windowSize: number, sampleRate: number): number {
	const binWidth = sampleRate / windowSize;
	return bin * binWidth;
}

export { logslider, binToHz };
