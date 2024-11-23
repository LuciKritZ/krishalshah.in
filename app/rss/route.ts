import { siteConfig } from '@/config';
import { getPosts } from '@/lib/posts';

export async function GET() {
  let allBlogs = await getPosts();

  const itemsXml = allBlogs
    .sort((a, b) => {
      if (!a.publishedAt || !b.publishedAt) {
        return 0;
      }
      if (new Date(a?.publishedAt) > new Date(b?.publishedAt)) {
        return -1;
      }
      return 1;
    })
    .map(
      (post) => `<item>
        <title>${post.title}</title>
        <link>${siteConfig.url}/posts/${post.slug}</link>
        <description>${post.summary ?? ''}</description>
        <pubDate>${
          post.publishedAt ? new Date(post.publishedAt).toUTCString() : ''
        }</pubDate>
      </item>`
    )
    .join('/n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Krishal Shah</title>
        <link>${siteConfig.url}</link>
        <description>${siteConfig.description}</description>
        ${itemsXml}
      </channel>
    </rss>
  `;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
