'use client';

import { useState } from 'react';

import { Copy, CopyCheck, TerminalIcon } from 'lucide-react';
import { highlight } from 'sugar-high';

import { Button } from '../ui/button';

type CodeProps = {
  children: React.ReactNode;
  className?: string;
  title?: string;
} & any;

const Code = ({
  children,
  className = '',
  title = 'Javascript',
  ...props
}: CodeProps) => {
  const [copied, setCopied] = useState(false);
  let codeHTML = highlight(children as string);

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
          variant='ghost'
          disabled={copied}
          className='p-0 m-0 h-auto hover:bg-inherit hover:text-inherit disabled:opacity-100 transition-all duration-300 hover:scale-110 ease-linear transform'
          onClick={() => handleCopy(children)}
        >
          {copied ? (
            <>
              Copied!
              <CopyCheck className='text-green-500 transition-all duration-300 ease-linear' />
            </>
          ) : (
            <Copy className='code-icon transition-all duration-300 ease-linear' />
          )}
        </Button>
      </div>
      <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
    </div>
  );
};

export default Code;
