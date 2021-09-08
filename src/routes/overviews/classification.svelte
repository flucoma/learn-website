<!-- <script>
    import ml5 from 'ml5';
    import { onMount } from 'svelte';
    
    const data = [
    {r:255, g:0, b:0, color:'red-ish'},
    {r:254, g:0, b:0, color:'red-ish'},
    {r:253, g:0, b:0, color:'red-ish'},
    {r:0, g:255, b:0, color:'green-ish'},
    {r:0, g:254, b:0, color:'green-ish'},
    {r:0, g:253, b:0, color:'green-ish'},
    {r:0, g:0, b:255, color:'blue-ish'},
    {r:0, g:0, b:254, color:'blue-ish'},
    {r:0, g:0, b:253, color:'blue-ish'}
    ];
    
    const options = {
        task: 'classification',
        debug: false
    }
    
    
    
    onMount(() => {
        if (window) {
            const nn = ml5.neuralNetwork(options);
            data.forEach(item => {
                const inputs = {
                    r: item.r, 
                    g: item.g, 
                    b: item.b
                };
                const output = {
                    color: item.color
                };
                
                nn.addData(inputs, output);
            });
            nn.normalizeData();
            const trainingOptions = {
                epochs: 32,
                batchSize: 12
            }
            nn.train(trainingOptions, () => {
                const input = {r: 255, g: 0, b: 0}
                nn.classify(input, (err, res) => console.log(res)) 
            });
        }
    })
</script> -->