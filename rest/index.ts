import { PostMetadata, Tags } from '@/types/global-types';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;

type GetAllPostsReq = {
  searchQuery?: string;
  selectedTags?: string[];
  page?: number;
  limit?: number;
};

type GetAllPostsRes = {
  readonly posts: PostMetadata[];
  readonly totalPages: number;
};

type GetAllTagsRequest =
  | undefined
  | {
      limit?: number;
      initialTags?: string[];
    };

export const getAllPosts = async ({
  searchQuery = '',
  selectedTags = [],
  page = 1,
  limit = 5,
}: GetAllPostsReq): Promise<GetAllPostsRes> => {
  const params = new URLSearchParams();

  if (searchQuery) {
    params.append('searchQuery', searchQuery);
  }

  if (selectedTags && !!selectedTags.length) {
    params.append('selectedTags', selectedTags.sort().join(','));
  }

  params.append('page', page.toString());
  params.append('limit', limit.toString());

  const res = await fetch(`${BASE_URL}/api/posts?${params.toString()}`);

  const resJson = (await res.json()) as { data: GetAllPostsRes };
  return resJson.data;
};

export const getAllTags = async (req?: GetAllTagsRequest): Promise<Tags> => {
  const params = new URLSearchParams();

  if (req?.limit) {
    params.append('limit', req?.limit.toString());
  }

  if (!!req?.initialTags?.length) {
    params.append('initialTags', req.initialTags.sort().join(','));
  }

  const res = await fetch(`${BASE_URL}/api/tags?${params.toString()}`);

  const resJson = (await res.json()) as { data: Tags };
  return resJson.data;
};
