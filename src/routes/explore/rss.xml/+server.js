// @ts-nocheck
import { db } from '$lib/app';

export const prerender = true;

const siteURL = 'https://learn.flucoma.org'
 
export async function GET({ }) {
	const posts = db
	.filter(x => x.flair == 'podcast')
	.sort((a, b) => {
		const atime = new Date(a.year, a.month, a.day);
		const btime = new Date(b.year, b.month, b.day);
		return atime - btime;
	});

	posts.forEach(async(p) => {
		const podcastRoute = p.url.split('/').pop();
		const backblazePrefix = 'https://f003.backblazeb2.com/file/flucoma-podcasts';
		const audioUrl = `${backblazePrefix}/${podcastRoute}.mp3`;
		p['audiourl'] = audioUrl;

		const params = { method: "HEAD" };

		const response = await fetch(audioUrl, params);
		const bytes = response.headers.get('content-length');
		p['length'] = bytes;
	});

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
	<title>${post.title}</title>
	<link>${siteURL}${post.url}</link>
	<guid isPermaLink="true">${siteURL}${post.url}</guid>
	<enclosure
		url="${post.audiourl}"
		length="${post.length}"
		type="audio/mpeg"
	/>
	<description>${post.blurb}</description>
	<author>info@flucoma.org</author>
	<pubDate>${new Date(post.year, post.month, post.day).toUTCString()}</pubDate>
	<content:encoded>
	<![CDATA[
		<p>
		${post.blurb}
		</p>
		<iframe 
		width="560"
		height="315"
		src=https://www.youtube.com/embed/${post.youtube}
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
		/>
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