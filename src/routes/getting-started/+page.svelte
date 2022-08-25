<script>
    import './theme.css'
    import Map from './Map.svelte';
    import Regressor from './Regressor.svelte';
    import Classifier from './Classifier.svelte';
    import ContentGallery from './ContentGallery.svelte';
</script>


<h1>Getting Started</h1>
<h2>Tutorials</h2>
<div class="widgets">
    <Map />
    <div class="pair">
        <Regressor width=150 height=150 />
        <Classifier width=300 height=150 />
    </div>
    <ContentGallery />
</div>

<style>
    .widgets {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;
    }
    .pair {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1em;
        justify-content: center;
    }
</style>
