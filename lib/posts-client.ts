import { readFileSync } from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { z } from 'zod';

import { PostMetadata, Tags } from '@/types/global-types';

export const postMetadataSchema = z.object({
  author: z.string().optional(),
  image: z.string().optional(),
  publishedAt: z
    .union([z.string(), z.date()])
    .transform(v => (v instanceof Date ? v.toISOString() : v))
    .optional(),
  summary: z.string().optional(),
  tags: z.array(z.string()).optional(),
  title: z.string().optional(),
});

const ROOT_CONTENT_DIRECTORY = path.join(process.cwd(), 'content', 'posts');

export const getPostMetadata = (filepath: string): PostMetadata => {
  const slug = filepath.replace(/\.mdx$/, '');
  const filePath = path.join(ROOT_CONTENT_DIRECTORY, filepath);
  const fileContent = readFileSync(filePath, { encoding: 'utf-8' });

  const { data } = matter(fileContent);
  const validatedData = postMetadataSchema.parse(data);
  return { ...validatedData, slug } as PostMetadata;
};

export const sortTagsByCount = (tags: Tags) => {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
};

const convertTagsToSortedTagsString = (tagParams: string[]) =>
  tagParams
    .filter(tag => !!tag.trim())
    .map(tag => tag.trim())
    .sort()
    .join(',');

export const updateTagsToSortedTagsString = (
  allTags: string,
  tag: string
): string => {
  const tags = allTags.split(',');
  if (tags.includes(tag.trim())) {
    return convertTagsToSortedTagsString(
      tags.filter(currentTag => currentTag !== tag)
    );
  }
  return convertTagsToSortedTagsString([...tags, tag]);
};
