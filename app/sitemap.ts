import { NAVIGATION_OPTIONS, siteConfig } from '@/config';
import { getPosts, getTags } from '@/lib/server/posts';

const currentDate = new Date().toISOString().split('T')[0];

export default async function sitemap() {
  const { posts: allPosts } = await getPosts();

  const posts = allPosts.map(post => ({
    lastModified: post.publishedAt
      ? new Date(post.publishedAt).toISOString().split('T')[0]
      : currentDate,
    url: `${siteConfig.url}/posts/${post.slug}`,
  }));

  const allTags = await getTags();

  const tags = Object.keys(allTags).map(tag => ({
    lastModified: currentDate,
    url: `${siteConfig.url}/posts?selectedTags=${tag}`,
  }));

  const routes = NAVIGATION_OPTIONS.map(route => ({
    lastModified: currentDate,
    url: `${siteConfig.url}${route.href}`,
  }));

  return [...posts, ...tags, ...routes];
}
