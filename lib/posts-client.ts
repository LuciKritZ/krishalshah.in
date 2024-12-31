import { readFileSync } from 'fs';
import path from 'path';

import matter from 'gray-matter';

import { PostMetadata, Tags } from '@/types/global-types';

const ROOT_CONTENT_DIRECTORY = path.join(process.cwd(), 'content', 'posts');

export const getPostMetadata = (filepath: string): PostMetadata => {
  const slug = filepath.replace(/\.mdx$/, '');
  const filePath = path.join(ROOT_CONTENT_DIRECTORY, filepath);
  const fileContent = readFileSync(filePath, { encoding: 'utf-8' });

  const { data } = matter(fileContent);
  return { ...data, slug };
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
