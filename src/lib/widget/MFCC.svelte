<script>
    import BipolarSlider from '$lib/components/BipolarSlider.svelte';
    let values = Array(13).fill(0);
    const slider = {min: -80, max: 80, step: 1}
</script>

<div class="multislider">
  {#each Array(13) as _, i}
  <BipolarSlider {...slider} bind:value={values[i]}/>
  {/each}
</div>

<style>
  .multislider {
    display: flex;
    flex-direction: row;
  }
</style>