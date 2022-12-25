import glob from 'glob';
import path from 'path';
import fs from 'fs';
import frontmatter from 'front-matter';
import { urlFromRoute, spill_to_array, get_components } from './util.js';

let db = {
	docs: []
};

glob('src/routes/*(reference|learn|explore)/*.svx', (err, routes) => {
	routes = routes.filter(p => path.basename(p) !== 'index.svx');

	routes.forEach(route => {
		const section = route.split('/')[2];

		const url = urlFromRoute(route);
		// Read the page in as a string
		const data = fs.readFileSync(route, 'utf8');

		// Get frontmatter
		let fm = frontmatter(data).attributes;
		fm.url = url;
		fm.section = section;

		// Featured
		let feature_info = {
			featuredimage: '',
			images: [],
			video: [],
			youtube: [],
			vimeo: []
		};

		let component_dict = get_components(frontmatter(data).body, ['Image', 'Video', 'YouTube', 'Vimeo']);

		// These wouldn't necessarily have to be spilled to arrays
		feature_info.images = spill_to_array(component_dict.Image, 'src');
		feature_info.video = spill_to_array(component_dict.Video, 'url');
		feature_info.youtube = spill_to_array(component_dict.YouTube, 'url');
		feature_info.vimeo = spill_to_array(component_dict.Vimeo, 'src');

		if (Object.keys(fm).includes('featuredimage')) {
			feature_info['featuredimage'] = fm.featuredimage;
		} else {
			if (component_dict.Image.length != 0) {
				feature_info['featuredimage'] =
					component_dict.Image[Math.floor(Math.random() * component_dict.Image.length)].src;
			}
		}

		fm.feature = feature_info;

		db.docs.push(fm);
	});

	// Write out results
	fs.writeFile('src/lib/data/db.json', JSON.stringify(db, null, 4), 'utf8', () => {
		console.log('Database file written to static/db.json');
	});
});
