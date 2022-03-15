<script>
    export let section_name = '';
    import { madewithdata } from '$lib/app.js';
    import ArrowRight from '$lib/components/ArrowRight.svelte';

    var this_data;
    var this_data_second;
    if(section_name == 'commissions'){
        this_data = madewithdata[section_name]["first"];
        this_data_second = madewithdata[section_name]["second"];
    }else{
        this_data = madewithdata[section_name];
    }

</script>

<ul>

        {#each this_data as item}
            <li>
                {#if section_name == 'commissions'}
                    <h3>{item.title}<span class="subtitle">, {item.by}.</span></h3>
                {:else}
                    <h3>{item.name}<span class="subtitle">, {item.by} ({item.year}).</span></h3>
                {/if}

                {#if section_name == 'commissions'}
                    <p>{item.note}</p>
                {:else}
                    <p>{item.desc}</p>
                {/if}

                <a href={item.url}>Go to <ArrowRight /></a>
            </li>

        {/each}

        {#if section_name == 'commissions'}
            {#each this_data_second as item}
                <li>
                    <h3>{item.title}<span class="subtitle">, {item.by}.</span></h3>
                    <p>{item.note}</p>
                    <a href={item.url}>Go to <ArrowRight /></a>
                </li>
            {/each}
        {/if}

</ul>

<style>

    .subtitle{
        font-weight: normal;
        font-style: italic;
    }

</style>