<script>
	import { fromArrayBuffer } from 'numpy-parser';
	import { browser } from '$app/env';

	let url = '/foo.npy';
	let d = {};
	if (browser) {
		fetch(url)
			.then((response) => response.arrayBuffer())
			.then((arr) => {
				d = fromArrayBuffer(arr);
				console.log(d);
			});
	}
</script>

{d.shape}
