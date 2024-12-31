import { readdirSync, readFileSync } from 'fs';
import path from 'path';

import matter from 'gray-matter';

import { Post, PostMetadata, Tags } from '@/types/global-types';

export const ROOT_CONTENT_DIRECTORY = path.join(
  process.cwd(),
  'content',
  'posts'
);

export const getPostMetadata = (filepath: string): PostMetadata => {
  const slug = filepath.replace(/\.mdx$/, '');
  const filePath = path.join(ROOT_CONTENT_DIRECTORY, filepath);
  const fileContent = readFileSync(filePath, { encoding: 'utf-8' });

  const { data } = matter(fileContent);
  return { ...data, slug };
};

export const getPosts = async (): Promise<PostMetadata[]> => {
  const files = readdirSync(ROOT_CONTENT_DIRECTORY);

  const posts = files
    .map((file) => getPostMetadata(file))
    .filter((file) => !!file.title)
    .sort((a, b) => {
      if (new Date(a?.publishedAt ?? '') < new Date(b?.publishedAt ?? '')) {
        return 1;
      }
      return -1;
    });

  return posts;
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  try {
    const filePath = path.join(ROOT_CONTENT_DIRECTORY, `${slug}.mdx`);

    if (!filePath) {
      return null;
    }

    const fileContents = readFileSync(filePath, { encoding: 'utf-8' });
    const { data, content } = matter(fileContents);

    return { metadata: { ...data, slug }, content };
  } catch (error) {
    return null;
  }
};

export const getTags = async (
  limit?: number,
  initialTags?: string[]
): Promise<Tags> => {
  const tags: Record<string, number> = {};
  const allPosts = await getPosts();

  allPosts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tags[tag] = (tags[tag] ?? 0) + 1;
    });
  });

  const selectedTags = initialTags?.filter((tag) => !!tags[tag]);

  const entries = Object.entries(tags);

  if (limit && limit !== 0 && entries.length > limit) {
    const filteredEntries = entries.slice(limit);
    const tagsNotInFilteredEntries = selectedTags?.filter(
      (tag) => !Object.keys(filteredEntries).includes(tag)
    );
    tagsNotInFilteredEntries?.forEach((tag) => {
      filteredEntries.push([tag, tags[tag]]);
    });

    return Object.fromEntries(filteredEntries);
  }

  return tags;
};

export const sortTagsByCount = (tags: Tags) => {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
};

const convertTagsToSortedTagsString = (tagParams: string[]) =>
  tagParams
    .filter((tag) => !!tag.trim())
    .map((tag) => tag.trim())
    .sort()
    .join(',');

export const updateTagsToSortedTagsString = (
  allTags: string,
  tag: string
): string => {
  let tags = allTags.split(',');
  if (tags.includes(tag.trim())) {
    return convertTagsToSortedTagsString(
      tags.filter((currentTag) => currentTag !== tag)
    );
  }
  return convertTagsToSortedTagsString([...tags, tag]);
};
