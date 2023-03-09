// @ts-nocheck
import { db } from '$lib/app';
const siteURL = 'https://learn.flucoma.org'
 
export function GET({ }) {
	const posts = db.filter(x => x.flair == 'podcast')
	const render = (posts) =>
	(`<?xml version="1.0" encoding="UTF-8" ?>
	<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
	<title>FluCoMa Learn Podcasts</title>
	<description>FluCoMa Learn Podcasts description</description>
	<link>https://learn.flucoma.org</link>
	<atom:link href="${siteURL}/explore/rss" rel="self" type="application/rss+xml"/>
	${posts
	.map(
		(post) => `<item>
	<guid isPermaLink="true">${siteURL}${post.url}/</guid>
	<title>${post.title}</title>
	<link>${siteURL}${post.url}/</link>
	<description>${post.blurb}</description>
	<language>en-gb</language>
	<pubDate>today</pubDate>
	<content:encoded>
	</content:encoded>
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