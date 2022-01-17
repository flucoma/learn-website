<script lang="ts">
	export let title: string = '';
	export let blurb: string = '';
	export let url: string = '';
</script>

<a href={url} class="container neutral-link">
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

	.container:hover {
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    }

    .container, .container:hover {
        transition: box-shadow 200ms ease-in-out;
    }

	.container > h4 {
		margin: 0;
	}

	.title {
		font-weight: bold;
	}
	.blurb {
		color: grey;
	}


</style>
