'use client';

import { Check, X } from 'lucide-react';
import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function MultiSelectCombobox({
  onChange,
  options,
  placeholder = 'Filter tags...',
  selected,
}: {
  onChange: (selected: string[]) => void;
  options: string[];
  placeholder?: string;
  selected: string[];
}) {
  const [inputValue, setInputValue] = useState('');

  const availableOptions = options.filter(opt =>
    opt.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className='flex w-full flex-col gap-3'>
      <div className='flex min-h-[48px] cursor-text flex-wrap items-center gap-2 rounded-md border border-border bg-background/50 px-3 py-2 transition-colors focus-within:border-brand/50'>
        {selected.map(opt => (
          <span
            className='flex items-center gap-1.5 rounded-sm bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-background transition-transform hover:scale-105 md:text-xs'
            key={opt}
          >
            {opt}
            <button
              className='cursor-pointer transition-colors hover:text-foreground'
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                onChange(selected.filter(s => s !== opt));
              }}
              type='button'
            >
              <X size={12} strokeWidth={3} />
            </button>
          </span>
        ))}
        <Input
          className='flex-1 min-w-[120px] border-none bg-transparent py-1 text-sm text-foreground shadow-none outline-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0'
          onChange={e => setInputValue(e.target.value)}
          placeholder={selected.length === 0 ? placeholder : ''}
          type='text'
          value={inputValue}
        />
      </div>

      <div className='max-h-60 overflow-y-auto rounded-md border border-border bg-background scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent'>
        {availableOptions.length > 0 ? (
          availableOptions.map(opt => {
            const isSelected = selected.includes(opt);
            return (
              <div
                className={cn(
                  'flex cursor-pointer items-center justify-between px-4 py-3 transition-colors',
                  isSelected
                    ? 'bg-brand/10 text-brand'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                )}
                key={opt}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isSelected) {
                    onChange(selected.filter(s => s !== opt));
                  } else {
                    onChange([...selected, opt]);
                  }
                }}
              >
                <span className='text-[10px] font-bold uppercase tracking-widest'>
                  {opt}
                </span>
                {isSelected && <Check className='text-brand' size={14} />}
              </div>
            );
          })
        ) : (
          <div className='px-4 py-3 text-sm text-muted-foreground'>
            No matching tags found.
          </div>
        )}
      </div>
    </div>
  );
}
