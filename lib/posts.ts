import { readdirSync, readFileSync } from 'fs';
import path from 'path';

import matter from 'gray-matter';

import { Post, PostMetadata } from '@/types/global-types';

const ROOT_CONTENT_DIRECTORY = path.join(process.cwd(), 'content', 'posts');

export const getPostMetadata = (filepath: string): PostMetadata => {
  const slug = filepath.replace(/\.mdx$/, '');
  const filePath = path.join(ROOT_CONTENT_DIRECTORY, filepath);
  const fileContent = readFileSync(filePath, { encoding: 'utf-8' });

  const { data } = matter(fileContent);
  return { ...data, slug };
};

export const getPosts = async (limit?: number): Promise<PostMetadata[]> => {
  const files = readdirSync(ROOT_CONTENT_DIRECTORY);

  const posts = files
    .map((file) => getPostMetadata(file))
    .sort((a, b) => {
      if (new Date(a.publishedAt ?? '') < new Date(b.publishedAt ?? '')) {
        return 1;
      }
      return -1;
    });

  if (limit) {
    return posts.slice(0, limit);
  }

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
