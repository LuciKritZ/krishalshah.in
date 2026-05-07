'use server';

import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import path from 'path';

import {
  GetPostsRequest,
  GetPostsResponse,
  GetTagsRequest,
  Post,
  PostMetadata,
  Tags,
} from '@/types/global-types';

import { getPostMetadata, postMetadataSchema } from '../posts-client';

const POSTS_PER_PAGE = 5;

const ROOT_CONTENT_DIRECTORY = path.join(process.cwd(), 'content', 'posts');

export const getPosts = async (
  req?: GetPostsRequest
): Promise<GetPostsResponse> => {
  const files = readdirSync(ROOT_CONTENT_DIRECTORY);

  let posts = files
    .map(file => getPostMetadata(file))
    .filter(file => !!file.title)
    .sort((a, b) => {
      if (new Date(a?.publishedAt ?? '') < new Date(b?.publishedAt ?? '')) {
        return 1;
      }
      return -1;
    });

  if (req?.searchQuery && req?.searchQuery?.trim()) {
    posts = posts.filter(post =>
      post.title?.toLowerCase().includes(req?.searchQuery?.toLowerCase() ?? '')
    );
  }

  if (req?.selectedTags && req.selectedTags.length > 0) {
    posts = posts.filter(post =>
      req.selectedTags?.every(tag => post.tags?.includes(tag))
    );
  }

  const totalCount = posts.length;
  const limit = req?.limit ?? POSTS_PER_PAGE;
  const page = req?.page ?? 1;
  const totalPages = Math.ceil(totalCount / limit);

  // Apply pagination
  posts = posts.slice(limit * (page - 1), limit * page);

  return {
    posts: [...posts],
    totalCount,
    totalPages,
  };
};

export const getPostBySlug = async (slug: string): Promise<null | Post> => {
  try {
    const filePath = path.join(ROOT_CONTENT_DIRECTORY, `${slug}.mdx`);

    if (!filePath) {
      return null;
    }

    const fileContents = readFileSync(filePath, { encoding: 'utf-8' });
    const { content, data } = matter(fileContents);
    const validatedData = postMetadataSchema.parse(data);

    return { content, metadata: { ...validatedData, slug } as PostMetadata };
  } catch {
    return null;
  }
};

export const getTags = async (req?: GetTagsRequest): Promise<Tags> => {
  const tags: Record<string, number> = {};
  const { posts: allPosts } = await getPosts();

  allPosts.forEach(post => {
    post.tags?.forEach(tag => {
      tags[tag] = (tags[tag] ?? 0) + 1;
    });
  });

  const selectedTags = req?.initialTags?.filter(tag => !!tags[tag]);

  const entries = Object.entries(tags);

  if (req?.limit && req?.limit !== 0 && entries.length > req?.limit) {
    const filteredEntries = entries.slice(req?.limit);
    const tagsNotInFilteredEntries = selectedTags?.filter(
      tag => !Object.keys(filteredEntries).includes(tag)
    );
    tagsNotInFilteredEntries?.forEach(tag => {
      filteredEntries.push([tag, tags[tag]]);
    });

    return Object.fromEntries(filteredEntries);
  }

  return tags;
};
