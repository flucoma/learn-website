from pathlib import Path
import json

"""
This script will parse the routes directory of this website and construct a json with all the links.
This can be consumed in the client side javascript in order to create a site-map or do other automagical stuff.
"""

structure = { 'routes' : [] }

route_path = Path('src/routes')

routes = [
    x 
    for x in route_path.rglob('*') 
    if not str(x.stem).startswith('__') 
    and not x.is_dir()
    and not x.stem == 'index'
]

for route in routes:
    url = '/'.join(list(route.parts[2:]))
    structure['routes'].append(url)

with open('static/structure.json', 'w') as f:
    json.dump(structure, f, indent=2)