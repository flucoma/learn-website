<script>
    import Map from './Map.svelte';
    import Regressor from './Regressor.svelte';
    import Classifier from './Classifier.svelte';
    import ContentGallery from './ContentGallery.svelte';
</script>


<div class="container">
    <h1>Getting Started</h1>
    <h2>Tutorials</h2>
    <Map />
    <div class="pair">
        <Regressor width=150 height=150 />
        <Classifier width=300 height=150 />
    </div>
    <ContentGallery />
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
