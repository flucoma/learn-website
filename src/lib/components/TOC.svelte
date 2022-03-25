<script>
	import { page } from '$app/stores';
	import { structure } from '$lib/app.js';
	import { onMount } from 'svelte';
	import Related from '$lib/components/Related.svelte'

	let headings = [];
	$: {
		let path = $page.url.pathname;
		path = path.endsWith('/') ? path.slice(0, -1) : path;
		headings = $structure[path] || [];
	}

	let toc_container;
	let scrollY = 0;
	let original_offset = 0;

	var can_exec = false;
	$: handle_scroll(scrollY);

	function handle_scroll(y_offset){
		if(can_exec){
			if(window.matchMedia("(min-width: 1200px)").matches){
				if (y_offset >= 100){
					toc_container.style.top = '0px';
					toc_container.style.maxHeight = '100%';
				}
				else{
					toc_container.style.top = String(original_offset) + 'px';
					toc_container.style.maxHeight = '80%';
				};
			}
			else{

				toc_container.style.top = "0px";
				toc_container.style.maxHeight = "100%";
				toc_container.style.overflowY = "none";
			}
		};
		can_exec = true;
	}

	onMount(async () => {
		can_exec = true;
		original_offset = toc_container.offsetTop;

		function reportWindowSize() {
			handle_scroll(scrollY)
		}

		window.onresize = reportWindowSize;
	});

</script>

<nav class="container" bind:this={toc_container}>
	<div>
		{#if headings.length > 0}
		<h3 class="toc">Table of Contents</h3>
		<div class="headings">
			{#each headings as h}
			<a href={h.url}>{h.text}</a>
			{/each}
		</div>
		{/if}
	</div>
	<Related />
</nav>

<svelte:window bind:scrollY={scrollY} />

<style lang="postcss">
	.container {
		display: flex;
		flex-direction: column;
		gap: 1em;
		position: fixed;
		z-index: 1;
		max-width: 23ch;
		
		top: auto;
		max-height: 80%;
		overflow-y: scroll;

		transition-property: top;
		transition-duration: 1s;
	}

	.headings {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	a {
		text-decoration: none;
		font-size: 0.8rem;
	}

	@media (max-width: 1200px) {
		.container {
			position: relative;
			display: grid;
			grid-template-columns: auto auto;
			max-width: 100%;
			width: 100%;

			top: auto;
			max-height: 100%;
			overflow-y: none;
		}
	}
</style>
