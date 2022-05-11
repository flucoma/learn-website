<script context="module">
	/** @type {import('./[...path]').Load} */
	export function load({ params }) {
		return {
			status: 404,
			error: `${params.path} does not exist.`
		};
	}
</script>
