<script>
    import Map from './Map.svelte';
    import Regressor from './Regressor.svelte';
    import Classifier from './Classifier.svelte';
    import ContentGallery from './ContentGallery.svelte';
</script>

<h1>Getting Started</h1>

<div class="container">
    <Map />
    <div class="pair">
        <Regressor width=150 height=150 />
        <Classifier width=300 height=150 />
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
    .pair {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1em;
    }
</style>

<ContentGallery />