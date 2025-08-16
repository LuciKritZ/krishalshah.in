'use client';

import { HTMLAttributes, useState } from 'react';

import { Check, EditIcon, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { EditStringAPICall } from '@/types/global-types';

import TiptapEditor from './editor';

interface EditContentProps {
  containerClassName?: HTMLAttributes<HTMLDivElement>['className'];
  editorClassName?: HTMLAttributes<HTMLDivElement>['className'];
  initialContent: string;
  onUpdateContent: EditStringAPICall;
}

const EditContent = ({
  initialContent,
  onUpdateContent,
  editorClassName = '',
  containerClassName = '',
}: EditContentProps) => {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [content, setContent] = useState<string>(initialContent);
  if (!isEditing) {
    return (
      <div
        className={cn('flex items-center gap-2 flex-wrap', containerClassName)}
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <EditIcon
          className='size-5 cursor-pointer text-secondary-foreground dark:text-secondary/60'
          onClick={() => setEditing(true)}
        />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className='flex'>
        <TiptapEditor
          className={editorClassName}
          content={content}
          onChange={(updatedContent: string) => setContent(updatedContent)}
        />
        <div className='flex items-center gap-2 px-2'>
          <Check
            className='size-5 cursor-pointer'
            onClick={() => {
              onUpdateContent(content);
              setEditing(false);
            }}
          />
          <X
            className='size-5 text-red-500 cursor-pointer'
            onClick={() => {
              setContent(initialContent);
              setEditing(false);
            }}
          />
        </div>
      </div>
    );
  }
};

export default EditContent;
