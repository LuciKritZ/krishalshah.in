'use client';

import {
  useEffect,
  useState,
  useContext,
  ReactNode,
  useMemo,
  createContext,
  useCallback,
} from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import { sortTagsByCount, updateTagsToSortedTagsString } from '@/lib/posts';
import { getAllPosts, getAllTags } from '@/rest';
import { PostMetadata, Tags } from '@/types/global-types';

type PostsProviderProps = {
  children: ReactNode;
};

interface PostsContextProps {
  posts: undefined | PostMetadata[];
  tags: Tags;
  sortedTags: string[];
  isLoading: boolean;
  page: number;
  error: string | null;
  selectedTags: string[];
  totalPages: number;
  resetFiltersLink: () => string;
  createPaginationLink: (pageNumber: number | string) => string;
  createSearchLink: (searchQuery: string) => string;
  createSelectedTagsLink: (selectedTag: string) => string;
  shouldShowReset: boolean;
}

const DEFAULT_CONTEXT_PROPS: PostsContextProps = {
  posts: undefined,
  tags: {},
  sortedTags: [],
  isLoading: false,
  page: 1,
  error: null,
  selectedTags: [],
  totalPages: 1,
  resetFiltersLink: () => '',
  createPaginationLink: () => '',
  createSearchLink: () => '',
  createSelectedTagsLink: () => '',
  shouldShowReset: false,
};

const PostsProvider = ({ children }: PostsProviderProps) => {
  const [posts, setPosts] = useState<PostsContextProps['posts']>(undefined);
  const [tags, setTags] = useState<Tags>(DEFAULT_CONTEXT_PROPS.tags);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const page = Number(searchParams.get('page')) || 1;
  const query = String(searchParams.get('searchQuery') || '');
  const selectedTagsParams = String(searchParams.get('selectedTags') || '');

  const selectedTags = useMemo(
    () => selectedTagsParams.split(','),
    [selectedTagsParams]
  );
  const shouldShowReset = useMemo((): boolean => {
    const params = new URLSearchParams(searchParams);

    return !!params.size;
  }, [searchParams]);
  const sortedTags = useMemo(() => sortTagsByCount(tags), [tags]);

  const createSearchLink = (searchQuery: string) => {
    const params = new URLSearchParams(searchParams);

    if (searchQuery.trim() !== '') {
      params.set('searchQuery', searchQuery);
    } else {
      params.delete('searchQuery');
    }

    return `${pathname}?${params}`;
  };

  const createPaginationLink = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber.toString().trim() !== '') {
      params.set('page', pageNumber.toString());
    } else {
      params.delete('page');
    }

    return `${pathname}?${params.toString()}`;
  };

  const createSelectedTagsLink = (tag: string) => {
    const updatedTags = updateTagsToSortedTagsString(selectedTagsParams, tag);
    const params = new URLSearchParams(searchParams);

    if (updatedTags !== '') {
      params.set('selectedTags', updatedTags);
    } else {
      params.delete('selectedTags');
    }

    return `${pathname}?${params.toString()}`;
  };

  const fetchPostData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { posts, totalPages } = await getAllPosts({
        searchQuery: query,
        selectedTags,
        page,
      });

      setPosts(posts);
      setTotalPages(totalPages);
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  }, [query, page, selectedTags]);

  const fetchTags = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const tags = await getAllTags({ limit: 10, initialTags: selectedTags });
      setTags(tags);
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
    // Why? Because we don't want to call the API every time selectedTags are changed, we only want to call it once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetFiltersLink = (): string => {
    const params = new URLSearchParams(searchParams);
    params.delete('searchQuery');
    params.delete('page');
    params.delete('selectedTags');

    return `${pathname}?${params}`;
  };

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  useEffect(() => {
    fetchPostData();
  }, [query, page, selectedTags, fetchPostData]);

  const postsProviderContext: PostsContextProps = {
    posts,
    tags,
    sortedTags,
    isLoading,
    page,
    error,
    createPaginationLink,
    selectedTags,
    totalPages,
    resetFiltersLink,
    createSearchLink,
    createSelectedTagsLink,
    shouldShowReset,
  };

  return (
    <PostsContext.Provider value={postsProviderContext}>
      {children}
    </PostsContext.Provider>
  );
};

export const PostsContext = createContext<PostsContextProps>(
  DEFAULT_CONTEXT_PROPS
);

export const usePosts = () => useContext(PostsContext);

export default PostsProvider;
