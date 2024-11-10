import { infer } from 'zod';

// TODO: Find a way to enforce the gray matter properties while writing an mdx file.
export interface PostMetadata {
  title?: string;
  summary?: string;
  image?: string;
  author?: string;
  publishedAt?: string;
  slug: string;
}

export interface Post {
  metadata: PostMetadata;
  content: string;
}
