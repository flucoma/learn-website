<script>

import { fromArrayBuffer } from 'numpy-parser';
import { onMount } from 'svelte';

let d;

onMount(async() => {
    fetch('/ref/onsetslice/mags.npy')
    .then(res => res.arrayBuffer())
    .then(arr => {
        const raw = fromArrayBuffer(arr)
        const shape = raw.shape;
        const data = raw.data;
    })
})

</script>