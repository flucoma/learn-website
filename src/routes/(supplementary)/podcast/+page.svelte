<script>
// @ts-nocheck
	import { db } from '$lib/app';
	import Hero from '$lib/components/podcasts/Hero.svelte';
	const poddies = db
		.filter(x => x.flair == 'podcast')
		.sort((a, b) => {
			const atime = new Date(a.year, a.month, a.day);
			const btime = new Date(b.year, b.month, b.day);
			return btime - atime;
		});

	const audioURL = (/** @type {string} */ url) => {
		const podcastRoute = url.split('/').pop();
		const backblazePrefix = 'https://f003.backblazeb2.com/file/flucoma-podcasts';
		return `${backblazePrefix}/${podcastRoute}.mp3`;
	}
</script>

<div class="container">
	<Hero />
	<div class="episodes">
		{#each poddies as pod}
		<div class='episode raisedbox'>
			<div class="title">
				<!-- { pod.title.replace(/^FluCoMa Podcast #\d+: /, "") } -->
				{ pod.title }
			</div>
			<div class="blurb">
				{ pod.blurb }
			</div>
			<div class="date">
				{ new Date(pod.year, pod.month, pod.day).toDateString() }
			</div>
			
			<audio controls preload="none">
				<source src={audioURL(pod.url)} type="audio/mpeg"/>
			</audio>
		</div>
		{/each}
	</div>
</div>

<div class="banner">
	<img class='logo' src='/img/logo-main.svg' alt='FluCoMa Logo'/>
</div>


<style>
	.container {
		z-index: 100;
		display: flex;
		flex-direction: column;
		place-items: center;
		max-width: 600px;
		margin: 0 auto;
		margin-top: 1em; 
		gap: 1em;
	}
	.episodes {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 1em;
	}
	.episode {
		display: flex;
		flex-direction: column;
		width: 100%;
		background: white;
		padding: 1em;
		border-radius: 20px;
		gap: 0.5em;
	}
	.title {
		text-align: left;
		font-weight:bold;
		font-size: 16px;
	}
	.blurb {
		font-size: 14px;
		text-align: left;
	}
	.date {
		text-align: left;
		font-size: 10px;
		color: darkgray;
	}
	.logo {
		opacity: 0.05;
		height: 1200px;
		width: 100%;
	}
	div {
		text-justify: inter-word;
		text-align: justify;
	}
	.banner {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
	}
</style>