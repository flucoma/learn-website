from pathlib import Path
import json
import frontmatter
from md import parse_headings
from util import url_from_route

"""
This script will parse the routes directory of this website and construct a json with all the links.
This can be consumed in the client side javascript in order to create a site-map or do other automagical stuff.
"""

structure = { 'routes' : {} }
page_structures = { 'pages' : {} }
tag_db = { 'db' : {} }
crumbs = { 'crumbs' : {} }

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

    # Tags
    if 'tags' in front: # if there is a tags part of the frontmatter
        for tag in front['tags']:
            if not tag in tag_db['db']:
                tag_db['db'][str(tag)] = []
            
            tag_db['db'][str(tag)].append(url)

    ## Structure
    structure['routes'][section].append(route_data)

    ## Crumbs
    if section == 'reference':
        crumbs['crumbs'][url] = front['title']
    if section == 'madewithflucoma':
        crumbs['crumbs'][url] = front['artist']
    if section == 'guides':
        crumbs['crumbs'][url] = front['short']
    if section == 'overviews':
        crumbs['crumbs'][url] = front['title']

# Now write some JSON to static
with open('static/tag.json', 'w') as f:
    json.dump(tag_db, f, separators=(',', ':'))

with open('static/structure.json', 'w') as f:
    json.dump(structure, f, separators=(',', ':'))

with open('static/pages.json', 'w') as f:
    json.dump(page_structures, f, separators=(',', ':'))

with open('static/crumbs.json', 'w') as f:
    json.dump(crumbs, f, separators=(',', ':'))