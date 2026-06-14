'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  Bold,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
} from 'lucide-react';
import { useEffect } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function RichTextEditor({
  content,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    content,
    editorProps: {
      attributes: {
        class:
          'prose prose-sm dark:prose-invert min-h-[150px] w-full max-w-none px-3 py-2 bg-background border border-border rounded-b-md focus:outline-none focus:ring-1 focus:ring-brand',
      },
    },
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      // Handle the initial content set, but avoid cursor jump
      // Only set if different and editor is not focused
      if (!editor.isFocused) {
        editor.commands.setContent(content);
      }
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className='flex flex-col border border-border rounded-md overflow-hidden'>
      <div className='flex items-center gap-1 bg-surface border-b border-border p-1'>
        <button
          className={`p-2 rounded hover:bg-background transition-colors ${
            editor.isActive('bold')
              ? 'bg-background text-brand'
              : 'text-content-secondary'
          }`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          type='button'
        >
          <Bold size={16} />
        </button>
        <button
          className={`p-2 rounded hover:bg-background transition-colors ${
            editor.isActive('italic')
              ? 'bg-background text-brand'
              : 'text-content-secondary'
          }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          type='button'
        >
          <Italic size={16} />
        </button>
        <div className='w-px h-4 bg-border mx-1' />
        <button
          className={`p-2 rounded hover:bg-background transition-colors ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-background text-brand'
              : 'text-content-secondary'
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          type='button'
        >
          <Heading2 size={16} />
        </button>
        <button
          className={`p-2 rounded hover:bg-background transition-colors ${
            editor.isActive('heading', { level: 3 })
              ? 'bg-background text-brand'
              : 'text-content-secondary'
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          type='button'
        >
          <Heading3 size={16} />
        </button>
        <button
          className={`p-2 rounded hover:bg-background transition-colors ${
            editor.isActive('heading', { level: 4 })
              ? 'bg-background text-brand'
              : 'text-content-secondary'
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          type='button'
        >
          <Heading4 size={16} />
        </button>
        <button
          className={`p-2 rounded hover:bg-background transition-colors ${
            editor.isActive('heading', { level: 5 })
              ? 'bg-background text-brand'
              : 'text-content-secondary'
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          type='button'
        >
          <Heading5 size={16} />
        </button>
        <button
          className={`p-2 rounded hover:bg-background transition-colors ${
            editor.isActive('heading', { level: 6 })
              ? 'bg-background text-brand'
              : 'text-content-secondary'
          }`}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          type='button'
        >
          <Heading6 size={16} />
        </button>
        <button
          className={`p-2 rounded hover:bg-background transition-colors ${
            editor.isActive('bulletList')
              ? 'bg-background text-brand'
              : 'text-content-secondary'
          }`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          type='button'
        >
          <List size={16} />
        </button>
        <button
          className={`p-2 rounded hover:bg-background transition-colors ${
            editor.isActive('orderedList')
              ? 'bg-background text-brand'
              : 'text-content-secondary'
          }`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          type='button'
        >
          <ListOrdered size={16} />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
