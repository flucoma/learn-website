<script>
	import { config } from '$lib/app';
</script>

<div class="container">
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
	<div class="title">{config.frontPage.featuredVideo.title}</div>		
	<div class="blurb">{config.frontPage.featuredVideo.blurb}</div>			
</div>

<style>
	.container {
		max-width: 250px;
	}
</style>