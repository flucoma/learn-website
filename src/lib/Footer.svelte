<footer>
	<div class="container">
		<div class="column">
			<div class="head">ADDRESS</div>
			<div class="address">
				<div>FluCoMa Project</div>
				<div>Department of Music</div>
				<div>University of Huddersfield</div>
				<div>Queensgate Campus</div>
				<div>Huddersfield, West Yorkshire</div>
				<div>England HD13DH</div>
			</div>
		</div>

		<div class="column">
			<div class="head">CONTACT</div>
			<div class="contact">
				e: <a href="mailto:info@flucoma.org">info@flucoma.org</a>
			</div>

			<div class="contact">
				t: <a target="_blank" href="https://twitter.com/flucoma">twitter.com/flucoma</a>
			</div>

			<div class="contact">
				f: <a target="_blank" href="https://www.facebook.com/flucoma">facebook.com/flucoma</a>
			</div>

			<div class="contact">
				<div>p: +44 (0)1484 47 36 08</div>
			</div>
		</div>

		<div class="column">
			<div>© University of Huddersfield. All rights reserved.</div>
			<div class="funding">
				This project has received funding from the European Research Council (ERC) under the
				European Union’s Horizon 2020 research and innovation programme (grant agreement No 725899).
			</div>
		</div>
	</div>
</footer>

<style lang="postcss">
	footer {
		width: 100%;
		margin-top: auto;
	}
	.container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		background-color: var(--dark-blue);
		color: white;
		font-size: 0.8em;
		gap: 2em;
		padding-top: 2em;
	}

	@media (min-width: 1200px) {
		.container {
			justify-content: center;
		}
	}

	@media (max-width: 1200px) {
		.container {
			justify-content: flex-start;
		}
	}

	.column {
		display: flex;
		flex-direction: column;
		padding-left: 2em;
		padding-right: 2em;
		max-width: 45ch;
	}

	.funding {
		text-align: justify;
		font-size: 0.75em;
	}

	.address {
		white-space: nowrap;
	}

	.head {
		font-weight: bold;
	}
</style>
