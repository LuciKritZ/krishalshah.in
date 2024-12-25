import { infer } from 'zod';

// TODO: Find a way to enforce the gray matter properties while writing an mdx file.
export interface PostMetadata {
  title?: string;
  summary?: string;
  image?: string;
  author?: string;
  publishedAt?: string;
  slug: string;
  tags?: Array<string>;
}

export interface Post {
  metadata: PostMetadata;
  content: string;
}

export interface ServerError {
  name: string;
  message: string;
}

export interface ExperienceSchema {
  description: string;
  _id: string;
  startDate: Date;
  companyLink: string;
  isCurrent: boolean;
  isRemote: boolean;
  companyName: string;
  jobTitle: string;
  companyImage: string;
  endDate?: Date;
}

// TODO: Remove this
export type EditStringAPICall = (updatedString: string) => Promise<void> | void;
