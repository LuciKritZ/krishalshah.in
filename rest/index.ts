import { PostMetadata, Tags } from '@/types/global-types';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;

type GetAllPostsReq =
  | undefined
  | {
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

export const getAllPosts = async (
  req?: GetAllPostsReq
): Promise<GetAllPostsRes> => {
  const params = new URLSearchParams();

  if (req?.searchQuery) {
    params.append('searchQuery', req.searchQuery);
  }

  if (req?.selectedTags && !!req?.selectedTags.length) {
    params.append('selectedTags', req.selectedTags.sort().join(','));
  }

  params.append('page', (req?.page ?? 1).toString());
  params.append('limit', (req?.limit ?? 5).toString());

  const res = await fetch(`${BASE_URL}/api/posts?${params.toString()}`, {
    cache: 'no-cache',
  });

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
