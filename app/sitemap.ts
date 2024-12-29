import { NAVIGATION_OPTIONS, siteConfig } from '@/config';
import { getAllPosts, getAllTags } from '@/rest';

const currentDate = new Date().toISOString().split('T')[0];

export default async function sitemap() {
  const { posts: allPosts } = await getAllPosts({});

  let posts = allPosts.map((post) => ({
    url: `${siteConfig.url}/posts/${post.slug}`,
    lastModified: post.publishedAt
      ? new Date(post.publishedAt).toISOString().split('T')[0]
      : currentDate,
  }));

  let allTags = await getAllTags();

  let tags = Object.keys(allTags).map((tag) => ({
    url: `${siteConfig.url}/posts?selectedTags=${tag}`,
    lastModified: currentDate,
  }));

  let routes = NAVIGATION_OPTIONS.map((route) => ({
    url: `${siteConfig.url}${route.href}`,
    lastModified: currentDate,
  }));

  return [...posts, ...tags, ...routes];
}
