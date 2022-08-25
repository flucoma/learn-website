<script>
	import _ from 'lodash';
	import { config, db } from '$lib/app';
	import { goto } from '$app/navigation';
	import LearnMoreArrow from '$lib/components/LearnMoreArrow.svelte';

	var learn = db.filter(x => x.section === 'learn');
	var explore = db.filter(x => x.section === 'explore');

	// Retrieve the article details from the database
	const featuredLearn = learn.filter(x => x.url === config.frontPage.featuredLearn.url)[0];
	const featuredExplore = explore.filter(x => x.url === config.frontPage.featuredExplore.url)[0];

	learn = learn.filter(x => x.url !== config.frontPage.featuredLearn.url);
	explore = explore.filter(x => x !== config.frontPage.featuredExplore.url);

	const randomLearn = _.shuffle(learn).slice(0, 3);
	const randomExplore = _.shuffle(explore).slice(0, 3);
</script>

<div class="main_wrapper">
	<!--Introductory text-->
	<div class="full_text_container">
		<p>
			<span style="font-size: 1.2em;"
				>Welcome to the <strong>Fluid Corpus Manipulation Learn platform</strong>.</span
			>
			<br />
			<a href="/getting-started">Get Started</a> with the FluCoMa ecosystem.
			<br />
			<a href="/learn">Learn</a> how to use the FluCoMa toolkit.
			<br />
			<a href="/explore">Explore</a> what other people are doing.
			<br />
			<a href="/reference">References</a> for all the algorithms in the toolkit.
			
		</p>
	</div>

	<!--Top featured section-->
	<div class="row_featured">
		<h2 class="row_title">Featured</h2>

		<div class="row_featured_article" style="grid-area: featuredArticle1;">
			<div
				class="feature_image"
				style="background-image: url({featuredLearn.featuredimage})"
				on:click={() => goto(featuredLearn.url)}
			/>

			<div class="flaired-title-featured">
				<div class="flair {featuredLearn.flair}" />
				<div>Learn: {featuredLearn.title}</div>
			</div>

			<div class="learn_more_link-featured">
				<LearnMoreArrow link={featuredLearn.url} />
			</div>
		</div>

		<div class="row_featured_article" style="grid-area: featuredArticle2;">
			<div
				class="feature_image"
				style="background-image: url({featuredExplore.feature.featuredimage ||
					_.sample(featuredExplore.feature.images) ||
					'/general/explore_default.jpeg'});"
				on:click={() => goto(featuredLearn.url)}
			/>

			<div class="flaired-title-featured">
				<div class="flair {featuredExplore.flair}" />
				<div>Explore: {featuredExplore.title}</div>
			</div>

			<div class="learn_more_link-featured">
				<LearnMoreArrow link={featuredExplore.url} />
			</div>
		</div>

		<div class="row_featured_video">
			<div class="front_page_video_container">
				<iframe
					title=""
					width="100%"
					height="300px"
					src={`https://www.youtube.com/embed/${config.frontPage.featuredVideo.url}`}
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				/>
			</div>

			<div class="video_description">
				<h3>
					{config.frontPage.featuredVideo.title}
				</h3>
				<p>
					{config.frontPage.featuredVideo.blurb}
				</p>
			</div>
		</div>
	</div>

	<div class="row_parent">
		<h2 class="row_title_lower">Previously Featured: Learn</h2>
		<div class="learn_more_link-section" style="grid-area: sectionLearnMore;">
			<div>
				<LearnMoreArrow link="/learn" />
			</div>
		</div>

		{#each randomLearn as item, i}
			<div class="img_container" style="grid-area: contentImg{i + 1};">
				<div
					class="feature_image"
					style="background-image: url({item.feature.featuredimage ||
						_.sample(randomLearn[0].feature.images) ||
						'/general/learn_default.jpeg'});"
					on:click={() => goto(item.url)}
				/>
			</div>
		{/each}

		{#each randomLearn as item, i}
			<div class="flaired-title" style="grid-area: contentTitle{i + 1};">
				<div class="flair {item.flair}" />
				<div>{item.title}</div>
			</div>
		{/each}

		{#each randomLearn as item, i}
			<div class="learn_more_link" style="grid-area: contentLink{i + 1};">
				<LearnMoreArrow link={item.url} />
			</div>
		{/each}
	</div>

	<div class="row_parent">
		<h2 class="row_title_lower">Previously Featured: Explore</h2>

		<div class="learn_more_link-section" style="grid-area: sectionLearnMore;">
			<LearnMoreArrow link="/explore" />
		</div>

		{#each randomExplore as item, i}
			<div class="img_container" style="grid-area: contentImg{i + 1};">
				<div
					class="feature_image"
					style="background-image: url({item.feature.featuredimage ||
						_.sample(randomLearn[0].feature.images) ||
						'/general/explore_default.jpeg'});"
					on:click={() => goto(item.url)}
				/>
			</div>
		{/each}

		{#each randomExplore as item, i}
			<div class="flaired-title" style="grid-area: contentTitle{i + 1};">
				<div class="flair {item.flair}" />
				<div>{item.title}</div>
			</div>
		{/each}

		{#each randomExplore as item, i}
			<div class="learn_more_link" style="grid-area: contentLink{i + 1};">
				<LearnMoreArrow link={item.url} />
			</div>
		{/each}
	</div>
</div>

<style>
	/*Main div*/
	.main_wrapper {
		gap: 1em;
	}

	/* Top featured div */
	.row_featured {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-areas:
			'featuredTitle featuredTitle'
			'featuredArticle1 featuredVideo'
			'featuredArticle2 featuredVideo';
		max-width: 80%;
		margin: 0 auto;
		gap: 1em;
	}

	.row_featured_article {
		border-radius: 0.25rem;
		padding: 0em 0.75em 0em 0.75em;
	}

	.row_featured_video {
		grid-area: featuredVideo;
	}

	.row_title {
		grid-area: featuredTitle;
		padding: 0.75em 0.75em 0em 0.5em;
		margin-top: 0em;
		margin-bottom: 0em;
	}

	.front_page_video_container {
		padding: 0.5em;
	}

	.video_description {
		padding: 0em 0.5em 0em 0.5em;
	}

	.flaired-title-featured {
		display: grid;
		grid-template-columns: 10px auto;
		justify-content: left;
		align-items: center;
		margin: 0em 0em 0.5em 0em;
		font-family: var(--font);
		font-weight: bold;
		gap: 0.25em;
	}

	.learn_more_link-featured {
		margin: 0em 0em 0.5em 0em;
	}

	.row_parent,
	.row_featured {
		padding-bottom: 1em;
	}

	/*Other sections*/
	.row_parent {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		margin: 0 auto;
		max-width: 80%;
		gap: 1em;
		grid-template-areas:
			'featuredTitle featuredTitle sectionLearnMore'
			'contentImg1 contentImg2 contentImg3'
			'contentTitle1 contentTitle2 contentTitle3'
			'contentLink1 contentLink2 contentLink3';
	}

	.row_title_lower {
		grid-area: featuredTitle;
		padding: 0.75em 0.75em 0em 0.5em;
		margin-top: 0em;
		margin-bottom: 0em;
	}

	.img_container {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 50% 50%;
		border-radius: 0.25rem;
		padding: 0em 0em 0em 0.75em;
		margin-top: 0em;
		margin-bottom: 0.25em;
	}

	.flaired-title {
		display: grid;
		grid-template-columns: 10px auto;
		justify-content: left;
		align-items: center;
		margin: 0em 0em 0.5em 0em;
		padding: 0em 0em 0em 0.75em;
		font-family: var(--font);
		font-weight: bold;
		gap: 0.25em;
	}

	.learn_more_link {
		margin: 0em 0em 0.5em 0em;
		padding: 0em 0em 0em 0.75em;
	}

	.learn_more_link-algo {
		padding: 0em 0.75em 0.75em 0.75em;
		align-self: center;
		justify-self: end;
		justify-content: end;
	}

	.learn_more_link-section {
		padding: 0.75em 0.75em 0em 0.75em;
		justify-self: end;
		align-self: center;
		justify-self: end;
		justify-content: end;
	}

	.feature_image {
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		position: relative;
		max-width: 100%;
		height: 10em;
		margin: 0.5em 0em 0.5em 0em;
		border: 0.063rem solid #dcdee0;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		cursor: pointer;
	}

	/*Algorithms row*/
	.algos_row {
		display: grid;
		grid-template-columns: 1fr 3fr 1fr;
		max-width: 80%;
		margin: 0 auto;
		margin-bottom: 5em;
		grid-gap: 1em;
		grid-template-areas:
			'featuredTitle featuredTitle sectionLearnMore'
			'algoTitle1 algoBlurb1 contentLink1'
			'algoTitle2 algoBlurb2 contentLink2'
			'algoTitle3 algoBlurb3 contentLink3';
	}

	.algo_blurb {
		padding: 0em 0.75em 0em 0.75em;
		font-style: italic;
	}

	/*Screen resizing stuff*/
	@media (min-width: 1200px) {
		.row_featured {
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas:
				'featuredTitle featuredTitle'
				'featuredArticle1 featuredVideo'
				'featuredArticle2 featuredVideo';
		}

		.row_parent {
			grid-template-columns: repeat(3, 1fr);
			grid-template-areas:
				'featuredTitle featuredTitle sectionLearnMore'
				'contentImg1 contentImg2 contentImg3'
				'contentTitle1 contentTitle2 contentTitle3'
				'contentLink1 contentLink2 contentLink3';
		}

		.algos_row {
			grid-template-columns: 1fr 3fr 1fr;
			grid-template-areas:
				'featuredTitle featuredTitle sectionLearnMore'
				'algoTitle1 algoBlurb1 contentLink1'
				'algoTitle2 algoBlurb2 contentLink2'
				'algoTitle3 algoBlurb3 contentLink3';
		}

		.learn_more_link-algo {
			padding: 0em 0.75em 0.75em 0.75em;
			align-self: center;
			justify-self: end;
			justify-content: end;
		}
	}

	@media (max-width: 1200px) {
		.row_featured {
			grid-template-columns: repeat(1, 1fr);
			grid-template-areas:
				'featuredTitle'
				'featuredArticle1'
				'featuredArticle2'
				'featuredVideo';
		}

		.row_parent {
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas:
				'featuredTitle sectionLearnMore'
				'contentImg1 contentImg1'
				'contentTitle1 contentTitle1'
				'contentLink1 contentLink1'
				'contentImg2 contentImg2'
				'contentTitle2 contentTitle2'
				'contentLink2 contentLink2'
				'contentImg3 contentImg3'
				'contentTitle3 contentTitle3'
				'contentLink3 contentLink3';
		}

		.algos_row {
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas:
				'featuredTitle sectionLearnMore'
				'algoTitle1 algoTitle1'
				'algoBlurb1 algoBlurb1'
				'contentLink1 contentLink1'
				'algoTitle2 algoTitle2'
				'algoBlurb2 algoBlurb2'
				'contentLink2 contentLink2'
				'algoTitle3 algoTitle3'
				'algoBlurb3 algoBlurb3'
				'contentLink3 contentLink3';
		}

		.learn_more_link-algo {
			padding: 0em 0.75em 0.75em 0.75em;
			align-self: center;
			justify-self: left;
			justify-content: left;
		}
	}

	/* Top introductiory text*/
	.full_text_container {
		padding: 3em 0.75em 0.75em 0.75em;
		margin-bottom: 0.5em;
		max-width: 80%;
		margin: 0 auto;
	}

	.full_text_container p {
		font-size: 1em;
		text-align: center;
	}

	/* Coloured boxes for flairs */
	.flair {
		width: 10px;
		height: 10px;
	}

	.event {
		background-color: rgb(235, 161, 23);
	}

	.article {
		background-color: var(--light-blue);
	}

	.reference {
		background-color: forestgreen;
	}

	.podcast {
		background-color: palevioletred;
	}

	.tutorial {
		background-color: rgba(102, 103, 171, 255);
	}
</style>
