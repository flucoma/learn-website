
<script>
	export let type= 'note';
</script>

<div id='container'
class:note={type==='note'}
class:warn={type==='warn'}
class:danger={type==='danger'}

>
	<slot/>
</div>	

<style>

#container {
	padding-left: 7px;
	gap: 3px;
}

.note {
	border-left: 3px solid rgb(52, 52, 171);
}	

.warn {
	border-left: 3px solid #ffcc00;
}

.danger {
	border-left: 3px solid #cc3300;
}

</style>