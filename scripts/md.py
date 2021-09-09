from typing import Iterable
from util import url_from_route

def parse_headings(page):
    headings = []
    c = {
        1 : 0,
        2 : 0,
        3 : 0,
        4 : 0,
        5 : 0
    }

    with open(page) as text:
        lines = text.readlines();
        for line in lines:
            if line.startswith('#'):
                heading = get_heading(line)
                indent = line.count('#')
                if indent >= 2:
                    base_url = url_from_route(page)
                    hashpart = get_hashpart(line)
                    url = f'{base_url}#{hashpart}'

                    calculated_heading = ''
                    c[indent] += 1
                    if indent == 1:
                        calculated_heading = f'{heading}'
                    elif indent == 2:
                        calculated_heading = f'{c[2]} {heading}'
                    elif indent == 3:
                        calculated_heading = f'{c[2]}.{c[3]} {heading}'
                    elif indent == 4:
                        calculated_heading = f'{c[2]}.{c[3]}.{c[4]} {heading}'
                    elif indent == 5:                    
                        calculated_heading = f'{c[2]}.{c[3]}.{c[4]}.{c[5]} {heading}'
                    for i in range(indent+1, 5):
                        c[i] = 0
                    else :
                        calculated_heading = heading

                    headings.append({
                        'heading' : calculated_heading,
                        'depth' : indent,
                        'url' : url
                    })
    return headings

def get_heading(line):
    line = line.rstrip()
    line = line.replace('#', '')
    line = line.lstrip()
    return line

def get_hashpart(line):

    line = line.replace('#', '')
    line = line.replace('.', '')
    line = line.replace("'", '')
    if line.startswith('--'):
        line = line.replace('--', '')
    line = line.replace('/', '')
    line = line.replace('(', '')
    line = line.replace(')', '')
    line = line.lstrip().rstrip().lower()
    line = line.replace(' ', '-')
    return line