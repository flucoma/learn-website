import json
import frontmatter
from subprocess import getstatusoutput as cli
from pathlib import Path
from md import parse_headings
from util import url_from_route

"""
This script will parse the routes directory of this website and construct a json with all the links.
This can be consumed in the client side javascript in order to create a site-map or do other automagical stuff.
"""

structure = { 'routes' : {} }
page_structures = { 'pages' : {} }
tag_db = { 'db' : {} }
last_edits = { 'routes' : {} }

route_path = Path('src/routes')

routes = [
    x
    for x in route_path.rglob('*') 
    if not str(x.stem).startswith('__') 
    and not x.is_dir()
    and not x.stem == 'index'
    and x.suffix == '.svx'
]

for route in routes:
    status, cli_output = cli(f'git log -1 {str(route)}')
    # Im horrible and im sorry 🚔 crime
    output_split = cli_output.split('\n')
    commit = output_split[0]
    author = output_split[1]
    modtime = output_split[2]
    
    last_commit = commit.split(' ')[1].lstrip().rstrip()
    author_name = author.split(':')[1].split('<')[0].lstrip().rstrip()
    last_edited = modtime.split(':', 1)[1].split('+')[0].lstrip().rstrip()
    last_edited = last_edited.split(' ')[1:4]
    last_edited = ' '.join(last_edited)

    last_edits['routes'][url_from_route(route)] = {
        'commit' : last_commit,
        'author' : author_name,
        'time' : last_edited,
        'url' : str(route)
    }

    url = Path('/'.join(list(route.parts[2:]))).with_suffix('')
    route_data = {}

    # Insert Section if it doesn't already exist
    section = route.parts[2]
    if not section in structure['routes']:
        structure['routes'][section] = []

    route_data = { 'url' : str(url) }

    url = url_from_route(route)

    page_structures['pages'][url] = parse_headings(route)

    # Now get the frontmatter and parse it
    front = frontmatter.load(route).metadata
    route_data['data'] = front
    if 'tags' in front: # if there is a tags part of the frontmatter
        for tag in front['tags']:
            if not tag in tag_db['db']:
                tag_db['db'][str(tag)] = []
            
            tag_db['db'][str(tag)].append(url)

    structure['routes'][section].append(route_data)


# Now write some JSON to static
with open('static/tag.json', 'w') as f:
    json.dump(tag_db, f, indent=2)

with open('static/structure.json', 'w') as f:
    json.dump(structure, f, indent=2)

with open('static/pages.json', 'w') as f:
    json.dump(page_structures, f, indent=2)

with open('static/edits.json', 'w') as f:
    json.dump(last_edits, f, separators=(',', ':'))
