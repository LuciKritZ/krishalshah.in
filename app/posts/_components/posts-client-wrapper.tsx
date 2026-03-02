'use client';

import dynamic from 'next/dynamic';

const SearchablePosts = dynamic(() => import('./searchable-posts'), {
  ssr: false,
});

export default function PostsClientWrapper() {
  return <SearchablePosts />;
}
