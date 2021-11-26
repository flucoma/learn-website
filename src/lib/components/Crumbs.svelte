<script>
	import { page } from '$app/stores';

	// Sanitise some special links where need be
	const lookup = {
		'made-with-flucoma': 'Made with FluCoMa',
		reference: 'Reference',
		guides: 'Guides',
		overviews: 'Overviews'
	};

	function formatCrumb(crumb) {
		if (crumb in lookup) return lookup[crumb];
		return crumb;
		// string = string.charAt(0).toUpperCase() + string.slice(1);
		// return string
	}

	function splitPath(path) {
		// Splits a full page path into an array of parts
		// This can be used to then construct the breadcrumbs
		let d = [];
		path = path.split('/').slice(1);
		let accum = '';
		path.forEach((p) => {
			accum += '/';
			accum += p;

			let crumb = { url: accum, text: formatCrumb(p) };
			d.push(crumb);
		});
		return d;
	}
	let crumbs;
	$: crumbs = splitPath($page.path);
</script>

<!-- Breadcrumbs -->
<div class="crumbs">
	<a href="/">Home</a>
	{#each crumbs as c}
		/ <a href={c.url}>{c.text}</a> &nbsp
	{/each}
</div>

<style>
	.crumbs {
		font-size: 0.8em;
	}
</style>
