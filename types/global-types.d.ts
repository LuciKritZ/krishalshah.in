import { infer } from 'zod';

// TODO: Find a way to enforce the gray matter properties while writing an mdx file.
export interface PostMetadata {
  author?: string;
  image?: string;
  publishedAt?: string;
  slug: string;
  summary?: string;
  tags?: Array<string>;
  title?: string;
}

export type Tags = Record<string, number>;

export interface Post {
  content: string;
  metadata: PostMetadata;
}

export interface ServerError {
  message: string;
  name: string;
}

export interface ExperienceSchema {
  _id: string;
  companyImage: string;
  companyLink: string;
  companyName: string;
  description: string;
  endDate?: Date;
  isCurrent: boolean;
  isRemote: boolean;
  jobTitle: string;
  startDate: Date;
}

export type GetPostsRequest =
  | undefined
  | {
      limit?: number;
      page?: number;
      searchQuery?: string;
      selectedTags?: string[];
    };

export type GetPostsResponse = {
  readonly posts: PostMetadata[];
  readonly totalPages: number;
};

type GetTagsRequest =
  | undefined
  | {
      initialTags?: string[];
      limit?: number;
    };

// TODO: Remove this
export type EditStringAPICall = (updatedString: string) => Promise<void> | void;
