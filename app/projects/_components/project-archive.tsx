'use client';

import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';

import { FilterBar } from '@/components/molecules/filter-system/filter-bar';
import ProjectCard from '@/components/molecules/project-card';
import { ProjectSkeleton } from '@/components/molecules/skeletons/project-skeleton';
import { Project } from '@/types/global-types';

const PAGE_SIZES = [8, 16, 32];

interface ProjectArchiveProps {
  availableLanguages: string[];
  currentPage: number;
  initialProjects: Project[];
  limit: number;
  searchQuery: string;
  selectedLanguages: string[];
  totalCount: number;
}

const ProjectArchive = ({
  availableLanguages,
  currentPage,
  initialProjects,
  limit,
  searchQuery,
  selectedLanguages,
  totalCount,
}: ProjectArchiveProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [localLanguages, setLocalLanguages] = useState(selectedLanguages);
  const isInitialMount = useRef(true);

  // Sync local query when the server-side prop changes
  // (e.g. "Clear all filters" or browser back/forward)
  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  // Sync local languages when prop changes (from URL)
  useEffect(() => {
    setLocalLanguages(selectedLanguages);
  }, [selectedLanguages]);

  // Debounce search — wait 400ms after the user stops typing
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

  // Helper to update URL search params — wrapped in startTransition
  // so isPending tracks the full server round-trip
  const updateParams = (updates: Record<string, null | string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Reset to page 1 when filters change
    if (
      (!updates.page && updates.q !== undefined) ||
      updates.lang !== undefined
    ) {
      params.set('page', '1');
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  // Pagination Logic
  const totalPages = Math.ceil(totalCount / limit);

  const handleFilter = (langs: string[]) => {
    setLocalLanguages(langs);
    updateParams({ lang: langs.length > 0 ? langs.join(',') : null });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page: page.toString() });
  };

  const handleLimitChange = (newLimit: number) => {
    updateParams({ limit: newLimit.toString(), page: '1' });
  };

  return (
    <div className='flex flex-col gap-12'>
      {/* Header Section */}
      <div className='flex flex-col gap-6'>
        <h1 className='display-title'>
          CODE <span className='text-content-tertiary'>ARCHIVE</span>
        </h1>
        <p className='body-text max-w-2xl'>
          A comprehensive collection of open-source projects, experiments, and
          technical explorations fetched directly from GitHub.
        </p>
      </div>

      {/* Common Filter System */}
      <FilterBar
        onFiltersChange={handleFilter}
        onSearchChange={setLocalQuery}
        options={availableLanguages}
        searchPlaceholder='Search repositories...'
        searchQuery={localQuery}
        selectedFilters={localLanguages}
      />

      {/* Results Grid */}
      <div className='relative min-h-[600px]'>
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
                <ProjectSkeleton key={i} />
              ))}
            </motion.div>
          ) : initialProjects.length > 0 ? (
            <motion.div
              animate={{ opacity: 1 }}
              className='grid grid-cols-1 gap-6 sm:grid-cols-2'
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              key='grid'
              transition={{ duration: 0.2 }}
            >
              {initialProjects.map(project => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              animate={{ opacity: 1 }}
              className='flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface/30 text-center'
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              key='empty'
            >
              <Search className='mb-4 opacity-20' size={48} />
              <p className='text-content-secondary font-display text-xl'>
                No projects match your criteria.
              </p>
              <button
                className='mt-4 text-xs font-bold uppercase tracking-widest text-brand hover:underline'
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
                        : 'border-border text-content-tertiary hover:border-border/50'
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
                  className='rounded-full border border-border bg-surface p-2 text-content-secondary transition-all hover:border-border/50 disabled:cursor-not-allowed disabled:opacity-30'
                  disabled={isPending || currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  className='rounded-full border border-border bg-surface p-2 text-content-secondary transition-all hover:border-border/50 disabled:cursor-not-allowed disabled:opacity-30'
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

export default ProjectArchive;
