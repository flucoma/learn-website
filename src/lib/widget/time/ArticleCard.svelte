<script>
	export let title = '';
	export let blurb = '';
	export let url = '';
	export let img = '';
</script>

<a class="container" href={url}>
	<h2>{title}</h2>
	<div>{blurb}</div>
	<img src={img} alt="article cover" />
</a>

<style>
	a {
		color: black;
		text-decoration: none;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		margin: 0.5em 0em 0.5em 0em;
		border: 0.063rem solid #dcdee0;
		cursor: pointer;
		position: relative;
		max-height: 600px;
		text-align: left;
	}
	h2,
	div {
		margin: 0;
		padding: 0.5em;
	}

	div {
	}
	a:hover {
		scale: 1.025;
		transition: scale 100ms linear;
		background: transparent;
	}
	img {
		position: absolute;
		top: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
		opacity: 0.075;
	}
</style>
