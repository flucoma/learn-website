// @ts-nocheck
import { db } from '$lib/app';

export const prerender = true;

const siteURL = 'https://learn.flucoma.org'
 
export function GET({ }) {
	const posts = db
	.filter(x => x.flair == 'podcast')
	.sort((a, b) => {
		const atime = new Date(a.year, a.month, a.day);
		const btime = new Date(b.year, b.month, b.day);
		return atime - btime;
	});

	console.log(posts)

	const render = (arr) =>
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
	<link>https://learn.flucoma.org</link>
	<atom:link href="${siteURL}/explore/rss" rel="self" type="application/rss+xml"/>
	
	${arr.map(post => 
	`<item>
	<guid isPermaLink="true">${siteURL}${post.url}</guid>
	<title>${post.title}</title>
	<link>${siteURL}${post.url}</link>
	<description>${post.blurb}</description>
	<author>info@flucoma.org</author>
	<pubDate>${new Date(post.year, post.month, post.day).toUTCString()}</pubDate>
	<content:encoded>
	<![CDATA[
		<div>
		This is some content
		</div>
	]]>
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