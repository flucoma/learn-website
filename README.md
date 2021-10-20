# Learn

To run this website you will need a package manager for js/node such as `pnpm`, `yarn` or `npm` and a Python 3+ installation.

You will also need to have a working virtual environment, or be willing to pollute the global space with the packages in `requirements.txt`.

`pip install -r requirements.txt`

## Run Locally

Inside this repository run:

`pnpm i`

and then to run a local server:

`pnpm run dev`

which will spawn a web server at http://localhost:3000

## Run Static Site

`pnpm run build`

which will create a static site in `./build`

# How does it work?

Pages are written in `.svx` format, which is a mix of markdown and svelte. Wrting is principally written in what you might know as normal markdown while bits of javascript (widgets, audio, pictures) are included as svelte widgets. There is also markdown frontmatter where you can include arbitrary information such as tags, a blurb, the title (so that you are not dependent on the name of the file itself). An example of a page describing how speakers work might look like this:

```
---
title: 'How speakers work'
blurb: | 
    Every wondered how sound is made by speakers? This article tells you all...
tags:
    - audio
    - technology
---

<script>
import MyAmazingWidget from '$lib/demos/amazingwidget.svelte'
</script>

# Speakers
They are very good at wiggling the air for us

## How?
Speaker move air wiggle. Simples. Look at the picture below

<MyAmazingWidget /> <-- this is defined inside the script tag and imported
```

In the `scripts` folder you will find a file called `extract_structure.py`. This will parse the `.svx` pages and return some JSON data that is then stored in the `static` folder of this website. This is used to programatically generate the pages, links, tags and some content.





