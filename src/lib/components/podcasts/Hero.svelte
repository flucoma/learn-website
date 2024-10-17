<img id='podcast-banner' src='/img/podcast_banner.jpg' alt='FluCoMa Podcast logo'/>
<h2><a href="/">FluCoMa Learn</a> Podcast</h2>
<div>FluCoMa Learn Podcasts are an intermittent series of interviews with artists discussing their work using and experimenting with machine learning and machine listening.</div>
<div class="links">
	<a class="podcasts-link raisedbox" href='https://podcasts.apple.com/gb/podcast/flucoma-learn-podcasts/id1678385732'>
		<img class='badge' src='/img/apple-podcasts.jpg' alt='Apple podcasts logo'/>
		Apple Podcasts
	</a>
	<a class="podcasts-link raisedbox" href='https://youtube.com/playlist?list=PLLzzOXU4pTgLQdkLtMSQB8QKyR8AbJfFX&feature=shared'>
		<img class='badge' src='/img/youtube_logo.png' alt='YouTube logo'/>
		YouTube Playlist
	</a>
	<a class="podcasts-link raisedbox" href='/explore/feed.rss'>
		<img class='badge' src='/img/rss.svg' alt='RSS logo'/>
		RSS
	</a>
</div>

<style>
	#podcast-banner {
		display: block;
		max-width: min(400px, 100%);
		height: auto;
		border-radius: 18%
	}
	.links {
		margin-top: 1em;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		flex-wrap: wrap;
		gap: 1em;
		width: 100%;
	}
	.podcasts-link {
		width: 100%;
		display: grid;
		grid-template-columns: auto auto;
		place-items: center;
		gap: 1em;
		text-decoration: none;
		border-radius: 20px;
		padding: 1em;
		background-color: white;
	}
	.podcasts-link:hover {
		color: var(--dark-blue);
	}

	.badge {
		height: 48px;
	}
</style>