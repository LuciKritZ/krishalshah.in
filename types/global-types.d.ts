export interface ExperienceSchema {
  _id: string;
  companyImage: string;
  companyLink: string;
  companyName: string;
  companyShortName?: string;
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
  readonly totalCount: number;
  readonly totalPages: number;
};

export interface GithubLanguage {
  name: string;
}

export interface GithubRepository {
  description: null | string;
  forkCount: number;
  homepageUrl: null | string;
  id: string;
  languages: {
    nodes: GithubLanguage[];
  };
  name: string;
  repositoryTopics: {
    nodes: GithubTopic[];
  };
  stargazerCount: number;
  url: string;
}

export interface GithubTopic {
  topic: {
    name: string;
  };
}

export interface Post {
  content: string;
  metadata: PostMetadata;
}

export interface PostMetadata {
  author?: string;
  image?: string;
  publishedAt?: string;
  slug: string;
  summary?: string;
  tags?: Array<string>;
  title?: string;
}

export interface Project {
  description: string;
  forks: number;
  homepage: string;
  id: string;
  language: string;
  link: string;
  stars: number;
  tags: string[];
  title: string;
}

export interface ServerError {
  message: string;
  name: string;
}

export type Tags = Record<string, number>;

type GetTagsRequest =
  | undefined
  | {
      initialTags?: string[];
      limit?: number;
    };
