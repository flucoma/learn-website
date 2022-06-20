<script type="ts">
	export let title: string = '';
	export let blurb: string = '';
	export let url: string = '';
</script>

<a href={url} class="container neutral-link raisedbox">
	<h4 class="title">
		{title}
	</h4>
	<div class="blurb">
		{blurb}
	</div>
</a>

<style>
	.container {
		color: black;
		text-decoration: none;
		max-width: 100%;
		cursor: pointer;
		border: 0.063rem solid #dcdee0;
		border-radius: 0.25em;
		padding: 0.5em;
	}

	.container > h4 {
		margin: 0;
	}

	.title {
		font-weight: bold;
	}
	.blurb {
		color: var(--grey);
	}
</style>
