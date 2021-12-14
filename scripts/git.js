import { exec, execSync } from 'child_process';
import { urlFromRoute } from './util.js';

const parseGitLog = (logString) => {
	let outputSplit = logString.split('\n');
	let commitData = outputSplit[0];
	let authorData = outputSplit[1];
	let timeData = outputSplit[2];

	let lastCommit = commitData.split(' ')[1].trim().slice(0, 6);
	let lastAuthor = authorData.split(':')[1].split('<')[0].trim();
	let lastEdited = timeData.split(':')[1].trim();
	return [lastCommit, lastAuthor, lastEdited];
};

const extractGit = (routes) => {
	let container = {};
	routes.forEach((route) => {
		let cmd = `git log -1 ${route}`;
		const out = execSync(cmd, { encoding: 'utf8' });
		const [commit, author, time] = parseGitLog(out);
		const info = {
			commit: commit,
			author: author,
			time: time,
			url: route
		};

		const key = urlFromRoute(route);
		container[key] = info;
	});
	return container;
};

export { extractGit };
