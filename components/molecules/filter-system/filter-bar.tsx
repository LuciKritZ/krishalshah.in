'use client';

import { Filter as FilterIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

import { MultiSelectCombobox } from './multi-select-combobox';
import { SearchBar } from './search-bar';

export function FilterBar({
  onFiltersChange,
  onSearchChange,
  options,
  searchPlaceholder = 'Search...',
  searchQuery,
  selectedFilters,
}: {
  onFiltersChange: (val: string[]) => void;
  onSearchChange: (val: string) => void;
  options: string[];
  searchPlaceholder?: string;
  searchQuery: string;
  selectedFilters: string[];
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!document.contains(e.target as Node)) return;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative z-10 flex flex-col gap-4 md:flex-row'>
      <div className='flex-1'>
        <SearchBar
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
          value={searchQuery}
        />
      </div>
      <div className='relative' ref={popoverRef}>
        <button
          className={cn(
            'cursor-pointer flex h-[48px] w-full items-center justify-center gap-3 rounded-sm border px-6 text-xs font-bold uppercase tracking-widest transition-colors md:h-[54px] md:w-auto',
            isPopoverOpen || selectedFilters.length > 0
              ? 'border-brand bg-brand text-background'
              : 'border-border bg-surface text-content-primary hover:border-brand/50'
          )}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <FilterIcon size={16} />
          Filters {selectedFilters.length > 0 && `(${selectedFilters.length})`}
        </button>

        <AnimatePresence>
          {isPopoverOpen && (
            <motion.div
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className='absolute right-0 top-[calc(100%+12px)] z-50 w-full rounded-lg border border-border bg-background p-6 shadow-2xl md:w-[400px]'
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className='mb-4 flex items-center justify-between'>
                <h4 className='font-display text-lg font-bold text-content-primary'>
                  Filter by Tags
                </h4>
                {selectedFilters.length > 0 && (
                  <button
                    className='cursor-pointer text-[10px] font-bold uppercase tracking-widest text-content-tertiary transition-colors hover:text-brand'
                    onClick={() => onFiltersChange([])}
                  >
                    Clear All
                  </button>
                )}
              </div>

              <MultiSelectCombobox
                onChange={onFiltersChange}
                options={options}
                selected={selectedFilters}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
