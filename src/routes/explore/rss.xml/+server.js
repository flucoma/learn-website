// @ts-nocheck
import { db } from '$lib/app';

export const prerender = true;

const siteURL = 'https://learn.flucoma.org'
 
export function GET({ }) {
	const posts = db.filter(x => x.flair == 'podcast')
	const render = (posts) =>
	(`<?xml version="1.0" encoding="UTF-8" ?>
	<rss version="2.0" 
		xmlns:content="http://purl.org/rss/1.0/modules/content/"
		xmlns:dc="http://purl.org/dc/elements/1.1/"
		xmlns:atom="http://www.w3.org/2005/Atom"
		xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
		>
	<channel>
	<title>FluCoMa Learn Podcasts</title>
	<description>FluCoMa Learn Podcasts description</description>
	<language>en-gb</language>
	<link>https://learn.flucoma.org</link>
	<atom:link href="${siteURL}/explore/rss" rel="self" type="application/rss+xml"/>
	
	${posts
	.map(
		(post) => `<item>
	<guid isPermaLink="true">${siteURL}${post.url}/</guid>
	<title>${post.title}</title>
	<link>${siteURL}${post.url}/</link>
	<description>${post.blurb}</description>
	<pubDate>${new Date(1993, 1).toUTCString()}</pubDate>
	</item>`
	)
	.join('')
	}

	</channel>
	</rss>
	`)

	const xml = render(posts);
	
	return new Response(xml, {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml',
		  }
	});
}