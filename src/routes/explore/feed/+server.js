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
	await Promise.all(posts.forEach(async(p) => {
		const podcastRoute = p.url.split('/').pop();
		const backblazePrefix = 'https://f003.backblazeb2.com/file/flucoma-podcasts';
		const audioUrl = `${backblazePrefix}/${podcastRoute}.mp3`;
		p['audiourl'] = audioUrl;

		const params = { method: "HEAD" };
		const response = await fetch(audioUrl, params);
		const bytes = response.headers.get('content-length');
		p['length_in_bytes'] = bytes;
	}));

	const render = (arr) =>
	(`<?xml version="1.0" encoding="UTF-8" ?>
	<rss version="2.0" 
		xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
		xmlns:content="http://purl.org/rss/1.0/modules/content/"
		xmlns:dc="http://purl.org/dc/elements/1.1/"
		xmlns:atom="http://www.w3.org/2005/Atom"
		xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
		>
	<channel>
	<title>FluCoMa Learn Podcasts</title>
	<itunes:subtitle>Discuss, learn and explore FluCoMa</itunes:subtitle>
	<itunes:summary>FluCoMa Learn Podcasts are an intermittent series of interviews with artists discussing their work using and experimenting with machine learning and machine listening.</itunes:summary>
	<itunes:author>Fluid Corpus Manipulation Team</itunes:author>
	<itunes:explicit>No</itunes:explicit>
	<itunes:image href="https://learn.flucoma.org/img/podcast_banner.jpg"/>
	<itunes:category text="Technology" />
	<itunes:category text="Music Interviews" />
	<description>FluCoMa Learn Podcasts are an intermittent series of interviews with artists discussing their work using and experimenting with machine learning and machine listening.</description>
	<language>en-gb</language>
	<link>https://learn.flucoma.org</link>
	<atom:link href="${siteURL}/explore/rss.xml" rel="self" type="application/rss+xml"/>
	
	${arr.map((post, i) => 
	`<item>
	<title>${post.title}</title>
	<link>${siteURL}${post.url}</link>
	<guid isPermaLink="true">${siteURL}${post.url}</guid>
	<enclosure
		url="${post.audiourl}"
		length="${post.length_in_bytes}"
		type="audio/mpeg"
	/>
	<category>Technology</category>
	<itunes:author>Fluid Corpus Manipulation Team</itunes:author>
	<itunes:episode>${i+1}</itunes:episode>
	<itunes:explicit>No</itunes:explicit>
	<itunes:subtitle></itunes:subtitle>
	<itunes:summary></itunes:summary>
	<itunes:keywords>
	machine learning, machine listening, creative coding, composition, electronic music
	</itunes:keywords>
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