<script>
    export let title = ''
    export let blurb = ''
    export let url = ''
</script>

<a href={'/'+ url}>
    <div class='overview'>
        <div class='title'>
        { title }
        </div>
        <div class='blurb'>
        { blurb }
        </div>
    </div>
</a>

<style>
    a {
		color: black;
		text-decoration: none;
        max-width: 100%;
	}

	a:hover {
		color: black;
		background: white;
	}

    .title {
		font-weight: bold;
	}
	.blurb {
		color: grey;
	}

    .overview {
        cursor: pointer;
        padding: 0.4em;
        box-shadow: 0 1px 1.5px 2px rgba(0, 0, 0, 0.1);
        background-color: transparent;
		display: block;
    }

    .overview:hover {
        scale: 1.01; /* Everyone Else */
		-webkit-transform:scale(1.01); /* Chrome and Safari */
    }
</style>