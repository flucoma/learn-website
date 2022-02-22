<div class="navigation">

</div>

<main class="main">

    <h1>Choose your creative coding environment</h1>

	<div class="installations">
		<a  href="/installation/max">
			<h2>Max</h2>
			<img class="max" src="/img/max-logo.svg" alt="Max Logo" />
		</a>
		<a  href="/installation/sc">
			<h2>SuperCollider</h2>
			<img src="/img/sc-logo.svg" alt="SuperCollider Logo" />
		</a>
		<a  href="/installation/pd">
			<h2>PureData</h2>
			<img src="/img/pd-logo.png" alt="PureData Logo" />
		</a>
	</div>

</main>

<div class="related">
    
</div>

<style>

.main {
        grid-area: main;
        min-width: var(--min-text-width);
        max-width: var(--max-text-width);
        display: flex;
        flex-direction: column;
    }

    .navigation {
        grid-area: navigation;
        width: 25ch;
        height: max-content;
    }

    .related {
        grid-area: related;
        width: 25ch;
    }

    @media (max-width: 1200px) {
        .navigation {
            width: 100%;
        }

        .related {
            display: none;
        }
    }

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