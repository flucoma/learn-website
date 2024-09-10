<script>
	export let type = 'note';

	const lookup = new Map([
		['note', 'Note'],
		['warn', 'Warning'],
		['danger', 'Danger'],
		['pointer', 'Pointer']
	]);
</script>

<div class="container {type}">
	<div class="header">{lookup.get(type)}</div>
	<div class="text">
		<slot />
	</div>
</div>

<style>
	.container {
		--bg-color: rgba(224, 244, 252, 1);
		--border-color: rgba(52, 52, 171, 0.63);
		border-left: 4px solid var(--border-color);
		color: rgb(65, 65, 65);
		border-radius: 12px;
		margin: 1.5em 0; 
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
		overflow: hidden;
	}

	.text > :global(p) {
		padding: 1.25em;
		margin: 0;
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.header {
		background-color: var(--bg-color);
		font-weight: 800;
		padding: 0.75em 1.25em;
		font-size: 1.1rem;
	}

	.note {
		--bg-color: rgba(52, 52, 171, 0.2);
		--border-color: rgba(31, 31, 136, 0.63);
	}

	.warn {
		--bg-color: rgba(255, 204, 0, 0.2);
		--border-color: rgba(255, 204, 0, 0.63);
	}

	.danger {
		--bg-color: rgba(204, 51, 0, 0.2);
		--border-color: rgba(204, 51, 0, 0.63);
	}

	.pointer {
		--bg-color: rgba(230, 252, 224, 1);
		--border-color: rgb(133, 229, 106);
	}
</style>
