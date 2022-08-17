export const assets = 'https://f003.backblazeb2.com/file/learnassets';

const sanitise = link => {
	return link.replaceAll(' ', '+');
};

export const createLink = link => {
	const validLink = sanitise(link);
	return `${assets}${validLink}`;
};
