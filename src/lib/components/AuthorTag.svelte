<script lang="ts">
	export let author: string = '';
	import { authors } from '$lib/app.js';

	const author_name = authors[author]['name'];
	const author_website = authors[author]['website'];
</script>

<p class="author_link">by <a href={author_website}>{author_name}</a></p>

<style lang="postcss">
	.author_link {
		font-weight: bold;
		font-size: 1.1em;
	}
</style>
