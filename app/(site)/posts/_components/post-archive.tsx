'use client';

import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';

import { FilterBar } from '@/components/molecules/filter-system/filter-bar';
import PostCard from '@/components/molecules/post-card';
import { PostSkeleton } from '@/components/molecules/skeletons/post-skeleton';
import { PostMetadata } from '@/types/global-types';

const PAGE_SIZES = [8, 16, 32];

interface PostArchiveProps {
  availableTags: string[];
  currentPage: number;
  initialPosts: PostMetadata[];
  limit: number;
  searchQuery: string;
  selectedTags: string[];
  totalCount: number;
  totalPages: number;
}

const PostArchive = ({
  availableTags,
  currentPage,
  initialPosts,
  limit,
  searchQuery,
  selectedTags,
  totalCount,
  totalPages,
}: PostArchiveProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [localTags, setLocalTags] = useState(selectedTags);
  const isInitialMount = useRef(true);

  // Sync local query when prop changes
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  // Sync local tags when prop changes (from URL)
  useEffect(() => {
    setLocalTags(selectedTags);
  }, [selectedTags]);

  // Debounce search
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      updateParams({ q: localQuery });
    }, 400);

    return () => clearTimeout(timer);
  }, [localQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateParams = (updates: Record<string, null | string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    if (
      (!updates.page && updates.q !== undefined) ||
      updates.tags !== undefined
    ) {
      params.set('page', '1');
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleFilter = (tags: string[]) => {
    setLocalTags(tags);
    updateParams({ tags: tags.length > 0 ? tags.join(',') : null });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page: page.toString() });
  };

  const handleLimitChange = (newLimit: number) => {
    updateParams({ limit: newLimit.toString(), page: '1' });
  };

  return (
    <div className='flex flex-col gap-12'>
      <FilterBar
        onFiltersChange={handleFilter}
        onSearchChange={setLocalQuery}
        options={availableTags}
        searchPlaceholder='Search the blog...'
        searchQuery={localQuery}
        selectedFilters={localTags}
      />

      <div className='relative min-h-[400px]'>
        <AnimatePresence mode='wait'>
          {isPending ? (
            <motion.div
              animate={{ opacity: 1 }}
              className='grid grid-cols-1 gap-6 sm:grid-cols-2'
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              key='skeletons'
              transition={{ duration: 0.2 }}
            >
              {Array.from({ length: limit }).map((_, i) => (
                <PostSkeleton key={i} />
              ))}
            </motion.div>
          ) : initialPosts.length > 0 ? (
            <motion.div
              animate={{ opacity: 1 }}
              className='grid grid-cols-1 gap-6 sm:grid-cols-2'
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              key='posts'
              transition={{ duration: 0.2 }}
            >
              {initialPosts.map(post => (
                <PostCard key={post.slug} {...post} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              animate={{ opacity: 1 }}
              className='flex h-64 flex-col items-center justify-center rounded-sm border border-dashed border-border bg-surface/30 text-center'
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              key='empty'
            >
              <Search className='mb-4 opacity-20' size={48} />
              <p className='font-display mb-4 text-xl text-content-tertiary'>
                No posts match your criteria.
              </p>
              <button
                className='text-xs font-bold uppercase tracking-widest text-brand hover:underline'
                onClick={() => {
                  setLocalQuery('');
                  handleFilter([]);
                }}
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination Footer */}
      {(totalCount > PAGE_SIZES[0] || totalPages > 1) && (
        <div className='flex flex-col items-center justify-between gap-6 border-t border-border pt-8 md:flex-row'>
          {totalCount > PAGE_SIZES[0] && (
            <div className='flex items-center gap-4'>
              <span className='micro-text'>View:</span>
              <div className='flex gap-2'>
                {PAGE_SIZES.map(size => (
                  <button
                    className={`rounded-sm border px-3 py-1 text-[10px] font-bold transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                      limit === size
                        ? 'border-brand text-brand'
                        : 'border-border text-content-tertiary hover:border-brand/20'
                    }`}
                    disabled={isPending || limit === size}
                    key={size}
                    onClick={() => handleLimitChange(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {totalPages > 1 && (
            <div className='flex items-center gap-6'>
              <span className='micro-text'>
                Page {currentPage} of {totalPages}
              </span>
              <div className='flex gap-2'>
                <button
                  className='rounded-full border border-border bg-surface p-2 text-content-secondary transition-all hover:border-brand/20 disabled:cursor-not-allowed disabled:opacity-30'
                  disabled={isPending || currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  className='rounded-full border border-border bg-surface p-2 text-content-secondary transition-all hover:border-brand/20 disabled:cursor-not-allowed disabled:opacity-30'
                  disabled={isPending || currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostArchive;
