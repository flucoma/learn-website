<script lang="ts">
	import { page } from '$app/stores';
	import { breadcrumbs } from '$lib/app';

	function splitPath(path) {
		// Splits a full page path into an array of parts
		// This can be used to then construct the breadcrumbs
		let d = [];
		path = path.split('/');
		path.shift(); path.pop();

		let accum = '';
		path.forEach((p, i) => {
			let sanitisedText = '';
			if (i >= 1) {
				let path = $page.url.pathname; 
				path = path.endsWith('/') ? path.slice(0, -1) : path;
				sanitisedText = $breadcrumbs[path];
			} else {
				sanitisedText = p[0].toUpperCase() + p.slice(1);
			}
			accum += `/${p}`;
			let crumb = { url: accum, text: sanitisedText };
			d.push(crumb);
		});
		return d;
	}
	$: crumbs = splitPath($page.url.pathname);
</script>

<nav class="container">
	<div class="left" />
	<div class="crumbs">
		<a href="/">Home</a>
		{#each crumbs as c}
			/ <a href={c.url}>{c.text}</a> &nbsp
		{/each}
	</div>
	<div class="right" />
</nav>

<style lang="postcss">
	.container {
		display: grid;
		grid-template-columns: auto min(var(--max-text-width), 100%) auto;
		padding: 1em;
	}
	.crumbs {
		font-size: 0.8rem;
	}
</style>
