'use client';

import { Search, X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function SearchBar({
  onChange,
  placeholder = 'Search...',
  value,
}: {
  onChange: (val: string) => void;
  placeholder?: string;
  value: string;
}) {
  return (
    <div className='relative w-full'>
      <Search
        className='absolute left-4 top-1/2 -translate-y-1/2 text-content-tertiary'
        size={18}
      />
      <Input
        className={cn(
          'h-[48px] w-full rounded-sm border-white/10 bg-surface/50 pl-12 pr-12 text-sm text-content-primary placeholder:text-content-tertiary transition-all focus:border-brand/40 focus:bg-surface focus-visible:ring-0 focus-visible:ring-offset-0 md:h-[54px]'
        )}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        type='text'
        value={value}
      />
      {value && (
        <button
          className='absolute right-4 top-1/2 -translate-y-1/2 text-content-tertiary transition-colors hover:text-brand'
          onClick={() => onChange('')}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
