<script>
	import _ from 'lodash';
	import { config, db } from '$lib/app';

	import WelcomeBanner from '$lib/components/front-page/WelcomeBanner.svelte';
	import Article from '$lib/components/mosaic/Article.svelte';
	import VideoItem from '$lib/components/front-page/VideoItem.svelte';
	import Masonry from 'svelte-bricks';

	
	let learn = db.filter(x => x.section === 'learn');
	let explore = db.filter(x => x.section === 'explore');
	
	// Retrieve the article details from the database
	const featuredLearn = learn.filter(x => x.url === config.frontPage.featuredLearn.url)[0];
	const featuredExplore = explore.filter(x => x.url === config.frontPage.featuredExplore.url)[0];
	
	learn = learn.filter(x => x.url !== config.frontPage.featuredLearn.url);
	explore = explore.filter(x => x !== config.frontPage.featuredExplore.url);
	
	let randomLearn = [featuredLearn].concat(_.shuffle(learn).slice(0, 7));
	let randomExplore = [featuredExplore].concat(_.shuffle(explore).slice(0, 7));

	let [minColWidth, maxColWidth, gap] = [300, 500, 30];
	let width = 0;
	let height = 0;
</script>


<WelcomeBanner />

<!-- <section class='manual-feature'>
	<Article item={featuredLearn} />
	<Article item={featuredExplore} />
	<VideoItem />
</section> -->

<section class='learn feature'>
	<h2>Learn</h2>
	<p>Articles discussing workflows and ways of thinking about FluCoMa</p>
	<Masonry items={randomLearn} {minColWidth} {maxColWidth} {gap} idKey={'url'} animate={false} let:item bind:width bind:height>
		<Article {item} />
	</Masonry>
</section>

<section class='explore feature'>
	<h2>Explore</h2>
	<p>Podcasts with the community and deep dives into the work done with FluCoMa</p>
	<Masonry items={randomExplore} {minColWidth} {maxColWidth} {gap} idKey={'url'} animate={false} let:item bind:width bind:height>
		<Article {item} />
	</Masonry>
</section>

			
<style>
	.feature {
		padding-left: 2em;
		padding-right: 2em;
		margin-bottom: 1em;
		margin-top: 1em;
	}
</style>