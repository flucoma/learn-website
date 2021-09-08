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
    if front:
        route_data['data'] = front
    structure['routes'][section].append(route_data)


# Now write some JSON to static
with open('static/structure.json', 'w') as f:
    json.dump(structure, f, indent=2)

with open('static/pages.json', 'w') as f:
    json.dump(page_structures, f, indent=2)