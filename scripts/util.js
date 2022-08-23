import path from 'path';

const urlFromRoute = route => {
	let parse = path.parse(route);
	let base = parse.dir.split('/').slice(2).join('/');
	return base
};

const spillToArray = (list_of_dicts, desired_key) => {
	var return_array = [];

	for (var i = 0; i < list_of_dicts.length; i++) {
		return_array.push(list_of_dicts[i][desired_key]);
	}

	return return_array;
};

const getComponents = (markdown_string, to_include) => {
	// TODO: parse a DOM
	// The best way of doing this would be to parse the markdown string as html, but that would
	// mean integrating a DOMParser through node or npm and whatnot...
	// so in the meantime....
	// I believe that this is also why youtube is returning null values - cause of '=' in values perhaps...

	let return_dict = {};
	for (var i = 0; i < to_include.length; i++) {
		return_dict[to_include[i]] = [];
	}

	var initial_break = markdown_string.split('<');

	for (i = 0; i < initial_break.length; i++) {
		// Going through each line component
		for (var j = 0; j < to_include.length; j++) {
			// And each type of component we want to match:
			var length_to_match = to_include[j].length;

			if (initial_break[i].substring(0, length_to_match) == to_include[j]) {
				// If this component is what we want to match:
				// Prepare an entry that will be added to the array:
				var entry_to_add = {};

				var second_break = initial_break[i].split('/>')[0].split('\n');
				second_break.shift();
				for (var k = 0; k < second_break.length; k++) {
					if (second_break[k].includes('=')) {
						var atr_name = second_break[k].split('=')[0].replace(' ', '');
						var atr_content = second_break[k].split('"')[1];

						entry_to_add[atr_name] = atr_content;
					}
				}
				// Add the entry to the array:
				return_dict[to_include[j]].push(entry_to_add);
			}
		}
	}

	return return_dict;
};

export { urlFromRoute, spillToArray, getComponents };
