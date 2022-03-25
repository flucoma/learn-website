import fs from 'fs';
import glob from 'glob';

console.log('Running snippet parse...')

let snippet_db = {"snippets" : []}

glob('static/snippets/*', (err, routes) => {

    routes.forEach((route) => {
        var code_files = [route + '/max.txt', route + '/sc.txt', route + '/pd.txt'];
        var meta_data_raw = fs.readFileSync(route + '/metadata.json');
        var meta_data = JSON.parse(meta_data_raw);

        var this_entry = {
            "meta_data" : meta_data
        }

        this_entry["meta_data"]["folder"] = route.split('/')[route.split('/').length - 1]

        code_files.forEach((file) => {
            var file_data = fs.readFileSync(file, 'utf8');
            this_entry[file.replace(/^.*[\\\/]/, '').split('.')[0]] = file_data
        });

        snippet_db["snippets"].push(this_entry);
    });

    fs.writeFile('static/snippets.json', JSON.stringify(snippet_db, null, 4), 'utf8', () => {
		console.log('Snippets file written to static/snippets.json')
	});
});