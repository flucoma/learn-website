<h1>Choose your creative coding environment</h1>

<div class="installations">
	<a sveltekit:prefetch href="/installation/max">
		<h2>Max</h2>
		<img class="max" src="/img/max-logo.svg" alt="Max Logo" />
	</a>
	<a sveltekit:prefetch href="/installation/sc">
		<h2>SuperCollider</h2>
		<img src="/img/sc-logo.svg" alt="SuperCollider Logo" />
	</a>
	<a sveltekit:prefetch href="/installation/pd">
		<h2>PureData</h2>
		<img src="/img/pd-logo.png" alt="PureData Logo" />
	</a>
</div>

<style>
	.installations {
		display: flex;
		flex-direction: column;
	}

	a {
		display: grid;
		grid-template-columns: auto auto;
		gap: 1em;
	}

	img {
		height: 64px;
	}

	.max {
		background: rgba(128, 128, 128, 0.342);
	}
</style>
