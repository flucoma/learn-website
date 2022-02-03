<script>
	import { fromArrayBuffer } from 'numpy-parser';
    import { onMount } from 'svelte';
 
    const db = '/reference/loudness/db.npy'
    const freq = '/reference/loudness/filter.npy'
    
    let y = [];
    let x = [];

    onMount(async () => {
        fetch(db)
        .then((response) => response.arrayBuffer())
        .then((arr) => {
            y = fromArrayBuffer(arr).data;
        });

        fetch(freq)
        .then((response) => response.arrayBuffer())
        .then((arr) => {
            x = fromArrayBuffer(arr).data;
        })
    })
</script>

{ x}

