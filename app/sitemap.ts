import { NAVIGATION_OPTIONS, siteConfig } from '@/config';
import { getPosts } from '@/lib/posts';
import { getAllTags } from '@/lib/tags';

const currentDate = new Date().toISOString().split('T')[0];

export default async function sitemap() {
  const allPosts = await getPosts();
  let posts = allPosts.map((post) => ({
    url: `${siteConfig.url}/posts/${post.slug}`,
    lastModified: post.publishedAt
      ? new Date(post.publishedAt).toISOString().split('T')[0]
      : currentDate,
  }));

  let allTags = getAllTags(allPosts);

  let tags = Object.keys(allTags).map((tag) => ({
    url: `${siteConfig.url}/tags/${tag}`,
    lastModified: currentDate,
  }));

  let routes = NAVIGATION_OPTIONS.map((route) => ({
    url: `${siteConfig.url}${route.href}`,
    lastModified: currentDate,
  }));

  return [...posts, ...tags, ...routes];
}