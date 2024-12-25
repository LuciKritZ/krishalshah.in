'use client';

import { HTMLAttributes } from 'react';

import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';

interface TiptapEditorProps {
  content?: string;
  onChange: (content: string) => void;
  className?: HTMLAttributes<HTMLDivElement>['className'];
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({
  content = '',
  onChange,
  className = '',
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return <div>Loading...</div>;

  return (
    <div>
      <EditorContent className={className} editor={editor} />
    </div>
  );
};

export default TiptapEditor;
