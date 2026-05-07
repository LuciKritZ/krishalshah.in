'use client';

import { Copy, CopyCheck, TerminalIcon } from 'lucide-react';
import { useState } from 'react';
import { highlight } from 'sugar-high';

import { Button } from '@/components/ui/button';

type CodeProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  className?: string;
  title?: string;
};

const Code = ({
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  className: _className = '',
  title = 'Javascript',
  ...props
}: CodeProps) => {
  const [copied, setCopied] = useState(false);
  const codeHTML = highlight(children as string);

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(true);

    // After 2 seconds, revert the icon back to the copy icon
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div>
      <div className='flex justify-between items-center pb-2'>
        <div className='code-language flex pb-2 font-bold'>
          <TerminalIcon className='mr-2 code-icon' />
          <span className='text-xs'>{title}</span>
        </div>

        <Button
          className='p-0 m-0 h-auto hover:bg-inherit hover:text-inherit disabled:opacity-100 transition-all duration-300'
          disabled={copied}
          onClick={() => handleCopy(children as string)}
          variant='ghost'
        >
          {copied ? (
            <>
              Copied!
              <CopyCheck className='code-icon text-green-500' />
            </>
          ) : (
            <Copy className='code-icon text-foreground/50' />
          )}
        </Button>
      </div>
      <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
    </div>
  );
};

export default Code;
