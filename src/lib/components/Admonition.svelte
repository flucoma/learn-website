<script>
	export let type='note';
	
	const lookup = new Map();
	[
	['note', 'Note'],
	['warn', 'Warning'],
	['danger', 'Danger'],
	['pointer', 'Pointer']
	].map(x => lookup.set(x[0], x[1]));
	console.log(lookup)
</script>

<div
class="container"
class:note={type === 'note'}
class:warn={type === 'warn'}
class:danger={type === 'danger'}
class:pointer={type === 'pointer'}
>
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
		border-radius: 0.25rem;
		margin-top: 1em;
		margin-bottom: 1em;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;	
	}
	
	.text > :global(p) {
		padding: 0.5em;
	}
	
	.header {
		background-color: var(--bg-color);
		font-weight: 800;
		padding: 0.5em;
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
