<script>
    import BipolarSlider from '$lib/components/BipolarSlider.svelte';
    let v = 0;
    const slider = {
      min: -80,
      max: 80,
      step: 1
    }
</script>

<BipolarSlider {...slider} bind:value={v}/>