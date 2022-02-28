<script>
    
    export let obj;
    
    const get_docs = async() => {
        const res = await fetch('https://learn.flucoma.org/api.json')
        const obj = await res.json();
        if (res.ok) {
            return obj
        } else {
            throw new Error(obj)
        }
    }
</script>

{#await get_docs()}
<p>Loading...</p>
{:then docs}
<p>{ docs[obj].client_name }</p>
{/await}