export const clip = (i, l, h) => {
	if (i < l) return l;
	if (i > h) return h;
	return i;
};
