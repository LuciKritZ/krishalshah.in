import React from 'react';

import { slug } from 'github-slugger';
import { Metadata } from 'next';

import Posts from '@/components/posts';
import Tag from '@/components/tag';
import { PostMetadata } from '@/global-types';
import { getPosts } from '@/lib/posts';
import { getAllTags, getPostsByTagSlug, sortTagsByCount } from '@/lib/tags';

interface IndividualTagParams {
  params: {
    tag: string;
  };
}

export async function generateMetadata({
  params,
}: IndividualTagParams): Promise<Metadata> {
  const { tag } = params;
  return {
    title: tag,
    description: `My posts on the topic ${tag}.`,
  };
}

export const generateStaticParams = async () => {
  let posts: PostMetadata[] = await getPosts();
  const tags = getAllTags(posts);
  const paths = Object.keys(tags).map((tag) => ({ tag: slug(tag) }));
  return paths;
};

const IndividualTag = async ({ params }: IndividualTagParams) => {
  const { tag } = params;
  // TODO: Think about this for scalability
  const title = tag.split('-').join(' ');
  const posts = await getPosts();

  const displayPosts = getPostsByTagSlug(posts, tag);
  const tags = getAllTags(posts);
  const sortedTags = sortTagsByCount(tags);

  return (
    <section className='pb-12 pt-40'>
      <div className='container max-w-3xl'>
        <div className='flex flex-wrap gap-2 mb-8 mt-8'>
          {sortedTags.map((t) => (
            <Tag tag={t} key={t} count={tags[t]} current={slug(t) === tag} />
          ))}
        </div>
        <h1 className='title mb-12 capitalize'>{title}</h1>
        <Posts posts={displayPosts} />
      </div>
    </section>
  );
};

export default IndividualTag;
