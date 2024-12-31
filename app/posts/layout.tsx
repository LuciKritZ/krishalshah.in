import { ReactNode, Suspense } from 'react';

import { Metadata } from 'next';

import PostsProvider from '@/providers/posts-provider';

export const metadata: Metadata = {
  title: 'My posts',
  description: 'Read my mind out with my posts.',
};

const PostsLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <Suspense>
      <PostsProvider>{children}</PostsProvider>;
    </Suspense>
  );
};

export default PostsLayout;
