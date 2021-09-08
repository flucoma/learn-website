from pathlib import Path
import json
import frontmatter

"""
This script will parse the routes directory of this website and construct a json with all the links.
This can be consumed in the client side javascript in order to create a site-map or do other automagical stuff.
"""

structure = { 'routes' : {} }
metadata = { 'data' : [] }

route_path = Path('src/routes')

routes = [
    x
    for x in route_path.rglob('*') 
    if not str(x.stem).startswith('__') 
    and not x.is_dir()
    and not x.stem == 'index'
]

for route in routes:
    if route.suffix == '.svx':
        print(route)
        url = Path('/'.join(list(route.parts[2:]))).with_suffix('')
        route_data = {}
        # Insert Section if it doesn't already exist
        section = route.parts[2]
        if not section in structure['routes']:
            structure['routes'][section] = []

        route_data = { 'url' : str(url) }
        # Now get the frontmatter and parse it
        post = frontmatter.load(route)
        front = post.metadata
        if front:
            route_data['data'] = front
        structure['routes'][section].append(route_data)





with open('static/structure.json', 'w') as f:
    json.dump(structure, f, indent=2)

with open('static/metadata.json', 'w') as f:
    json.dump(metadata, f, indent=2)