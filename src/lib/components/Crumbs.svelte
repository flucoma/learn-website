<script>
	import { page } from '$app/stores';
	import { crumbs } from '$lib/app';

	function splitPath(path) {
		// Splits a full page path into an array of parts
		// This can be used to then construct the crumbs
		let d = [];
		path = path.split('/');
		path.shift();
		path.pop();

		let accum = '';
		path.forEach((p, i) => {
			let sanitisedText = '';
			if (i >= 1) {
				let path = $page.url.pathname;
				path = path.endsWith('/') ? path.slice(0, -1) : path;
				sanitisedText = crumbs[path];
			} else {
				sanitisedText = p[0].toUpperCase() + p.slice(1);
			}
			accum += `/${p}`;
			let crumb = { url: accum, text: sanitisedText };
			d.push(crumb);
		});
		return d;
	}
	$: crumbArray = splitPath($page.url.pathname);
</script>

<nav class="container">
	<div class="left" />
	<div class="crumbArray">
		<a href="/">Home</a>
		{#each crumbArray as c}
			/ <a href={c.url}>{c.text}</a> &nbsp
		{/each}
	</div>
	<div class="right" />
</nav>

<style >
	.container {
		display: grid;
		grid-template-columns: auto min(var(--max-text-width), 100%) auto;
		padding: 0.5em;
	}
	.crumbArray {
		font-size: 0.8rem;
	}
</style>
