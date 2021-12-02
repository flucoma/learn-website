import glob from 'glob';
import path from 'path';
import fs from 'fs';
import frontmatter from 'front-matter';
import { extractGit } from './git.js';
import { urlFromRoute } from './util.js';
import { markdown } from 'markdown';


let structure = {};
let pageStructure = {};
let tags = {};
let crumbs = {};
let edits = {}


glob('src/**/*.svx', (err, routes) => {
    if (err) 
    {
        throw err
    } 
    else 
    {
        routes = routes.filter(p => path.basename(p) !== 'index.svx')
        edits = extractGit(routes)
        
        routes.forEach(route => {
            
            let section = route.split('/')[2]

            let url = urlFromRoute(route)
            
            // Read the page in as a string
            let data = fs.readFileSync(route, 'utf8');

            // Parse the markdown tree for the headings
            let tree = markdown.parse(data);
            if (!Object.keys(pageStructure).includes(url)) {
                pageStructure[url] = [];
            };

            tree.forEach(el => {
                if (el[0] === 'header' && el[1].level === 2) {
                    pageStructure[url].push(el[2])
                }
            });
            
            if (!Object.keys(structure).includes(section)) {
                structure[section] = [];
            }

            let fm = frontmatter(data).attributes;
            structure[section].push(fm);

            // Tags
            if (Object.keys(fm).includes('tags')) {
                fm.tags.forEach(tag => {
                    if (!Object.keys(tags).includes(tag)) {
                        tags[tag] = [];
                    };
                    tags[tag].push(url)
                });
            };

            // Structure
            structure[section].push({ 
                'url': url,
                'data' : fm 
            });

            // Crumbs
            switch (section) {
                case 'reference':
                    crumbs[url] = fm.title
                    break;
                case 'madewithflucoma':
                    crumbs[url] = fm.artist
                    break;
                case 'guides':
                    crumbs[url] = fm.short
                    break;
                case 'overviews':
                    crumbs[url] = fm.title
                    break;
            }
        });

        // Write out results
        fs.writeFile('static/tag.json', JSON.stringify(tags), 'utf8', ()=>{});
        fs.writeFile('static/structure.json', JSON.stringify(structure), 'utf8', ()=>{});
        fs.writeFile('static/pages.json', JSON.stringify(pageStructure), 'utf8', ()=>{});
        fs.writeFile('static/crumbs.json', JSON.stringify(crumbs), 'utf8', ()=>{});
        fs.writeFile('static/edits.json', JSON.stringify(edits), 'utf8', ()=>{});
    };
});
