<script>
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	let showToast = false;

	const dispatch = createEventDispatcher();

	function forwardedEvent() {
		dispatch('click');
	}

	const compositeEvent = () => {
		forwardedEvent();
		showToast = true;
		setTimeout(() => (showToast = false), 2000);
	};
</script>

<button aria-label="copy code" on:click={compositeEvent} transition:fade>
	{#if showToast}
		copied!
	{:else}
		<img src="/img/copy.svg" alt="copy code" />
	{/if}
</button>

<style>
	button {
		display: grid;
		place-items: center;
		font-family: var(--font);
		position: absolute;
		top: 0px;
		right: 0px;
		border: none;
		background-color: rgb(216, 216, 216);
		width: 64px;
		height: 40px;
		cursor: pointer;
		text-align: center;
	}

	button:hover {
		background-color: rgb(200, 200, 200);
	}

	img {
		width: 20px;
		height: 20px;
	}
</style>
