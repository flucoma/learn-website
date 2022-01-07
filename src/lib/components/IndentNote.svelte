<script>
	export let type = 'note';
</script>

<div
class="container"
class:note={type === 'note'}
class:warn={type === 'warn'}
class:danger={type === 'danger'}
>
<slot />
</div>

<style>
	.container {
		--bg-color: rgb(52, 52, 171, 0.2);
		--border-color: rgb(52, 52, 171, 1.0);
		padding: 1em;
		background-color: var(--bg-color);
		border: 3px solid var(--bg-color);
	}
	
	.note {
		--bg-color: rgb(52, 52, 171, 0.2);
		--border-color: rgb(52, 52, 171, 0.5);
	}
	
	.warn {
		--bg-color: rgb(255, 204, 0, 0.2);
		--border-color: rgb(255, 204, 0, 0.5);
	}
	
	.danger {
		--bg-color: rgb(204, 51, 0, 0.2);
		--border-color: rgb(204, 51, 0, 0.5);
	}
</style>
