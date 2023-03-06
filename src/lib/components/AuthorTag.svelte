<script>
	/**
	 * A convenient way to render an author attribution.
	 * @constructor
	 * @param {string} author - The name of the author.
	 */
	export let author = '';

	const authors = new Map(
		Object.entries({
			Jacob: {
				name: 'Jacob Hart',
				website: 'https://jacob-hart.com/'
			},
			James: {
				name: 'James Bradbury',
				website: 'https://www.jamesbradbury.net/'
			},
			Ted: {
				name: 'Ted Moore',
				website: 'https://www.tedmooremusic.com/'
			},
			PA: {
				name: 'Pierre Alexandre Tremblay',
				website: 'https://www.pierrealexandretremblay.com/'
			},
			Owen: {
				name: 'Owen Green',
				website: 'http://owengreen.net/'
			}
		})
	);
	const author_name = authors.get(author)['name'];
	const author_website = authors.get(author)['website'];
</script>

<!--
@component
Render authors names in articles.

```svelte
<AuthorTag {author} />
```
-->

<p class="author_link">by <a href={author_website}>{author_name}</a></p>

<style>
	.author_link {
		font-weight: bold;
		font-size: 1.1em;
	}
</style>
