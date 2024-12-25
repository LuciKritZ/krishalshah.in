import { slug } from 'github-slugger';

import { PostMetadata } from '@/types/global-types';

export const getAllTags = (posts: PostMetadata[]): Record<string, number> => {
  const tags: Record<string, number> = {};
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tags[tag] = (tags[tag] ?? 0) + 1;
    });
  });

  return tags;
};

export const sortTagsByCount = (tags: Record<string, number>) => {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
};

export const getPostsByTagSlug = (posts: PostMetadata[], tag: string) =>
  posts.filter((post) => {
    if (!post.tags) return false;

    const slugifiedTags = post.tags.map((tag) => slug(tag));
    return slugifiedTags.includes(tag);
  });
