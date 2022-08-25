# Learn

[![Deployment](https://github.com/flucoma/learn/actions/workflows/deploy.yml/badge.svg)](https://github.com/flucoma/learn/actions/workflows/deploy.yml)

To run this website you will need a package manager for js/node such as `pnpm`, `yarn` or `npm`.

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

Pages are written in `.svx` format, which is a mix of markdown and svelte. Wrting is principally written in what you might know as normal markdown while bits of Javascript (widgets, audio, pictures) are included as svelte widgets. There is also markdown frontmatter where you can include arbitrary information such as tags, a blurb, the title (so that you are not dependent on the name of the file itself). An example of a page describing how speakers work might look like this:

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
import MyAmazingWidget from '$lib/components/AmazingWidget.svelte'
</script>

# Speakers
They are very good at wiggling the air for us

## How?
Speaker move air wiggle. Simples. Look at the picture below

<MyAmazingWidget /> <-- this is defined inside the script tag and imported
```

In the `scripts` folder you will find a file called `preprocess.js`. This will parse the `.svx` pages and return some JSON data that is then stored in the `static` folder of this website. This is used to programatically generate the pages, links, tags, related content references and a database for fuzzy searching.

You can learn more about the site's structure by visiting the [meta-documentation](https://github.com/flucoma/meta-documentation).
