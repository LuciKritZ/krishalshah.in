'use server';

import { readdirSync, readFileSync } from 'fs';
import path from 'path';

import matter from 'gray-matter';

import {
  GetPostsRequest,
  GetPostsResponse,
  GetTagsRequest,
  Post,
  Tags,
} from '@/types/global-types';

import { getPostMetadata } from '../posts-client';

const POSTS_PER_PAGE = 5;

const ROOT_CONTENT_DIRECTORY = path.join(process.cwd(), 'content', 'posts');

export const getPosts = async (
  req?: GetPostsRequest
): Promise<GetPostsResponse> => {
  const files = readdirSync(ROOT_CONTENT_DIRECTORY);

  let posts = files
    .map((file) => getPostMetadata(file))
    .filter((file) => !!file.title)
    .sort((a, b) => {
      if (new Date(a?.publishedAt ?? '') < new Date(b?.publishedAt ?? '')) {
        return 1;
      }
      return -1;
    });

  if (req?.searchQuery && req?.searchQuery?.trim()) {
    posts = posts.filter((post) =>
      post.title?.toLowerCase().includes(req?.searchQuery?.toLowerCase() ?? '')
    );
  }

  if (req?.selectedTags) {
    const tags = req.selectedTags
      .map((str) => str.trim())
      .sort()
      .join(',');

    posts = posts.filter((post) => post.tags?.sort().join(',').includes(tags));
  }

  const totalPosts = [...posts];

  if (req?.limit) {
    const page = req?.page ?? 1;
    posts = posts.slice(POSTS_PER_PAGE * (page - 1), POSTS_PER_PAGE * page);
  }

  return {
    posts: [...posts],
    totalPages: Math.ceil(totalPosts.length / POSTS_PER_PAGE),
  };
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

export const getTags = async (req?: GetTagsRequest): Promise<Tags> => {
  const tags: Record<string, number> = {};
  const { posts: allPosts } = await getPosts();

  allPosts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tags[tag] = (tags[tag] ?? 0) + 1;
    });
  });

  const selectedTags = req?.initialTags?.filter((tag) => !!tags[tag]);

  const entries = Object.entries(tags);

  if (req?.limit && req?.limit !== 0 && entries.length > req?.limit) {
    const filteredEntries = entries.slice(req?.limit);
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
