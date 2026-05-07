import { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';

export const metadata: Metadata = {
  description: 'Read my mind out with my posts.',
  title: 'My posts',
};

const PostsLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <Suspense>{children}</Suspense>;
};

export default PostsLayout;
