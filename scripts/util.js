import path from 'path';

const urlFromRoute = (route) => {
	let parse = path.parse(route);
	let base = parse.dir.split('/').slice(2).join('/');
	return `/${base}/${parse.name}`;
};

const sanitiseHashLink = (link) => {
	link = link.replace('.', '');
	link = link.replace("'", '');
	if (link.slice(0, 2) == '--') {
		link = link.replace('--', '');
	}
	link = link.replace('/', '');
	link = link.replace('(', '');
	link = link.replace(')', '');
	link = link.toLowerCase();
	link = link.replace(' ', '-');
	return link;
};
export { urlFromRoute, sanitiseHashLink };
