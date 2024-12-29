import { NextRequest } from 'next/server';

import { getPosts } from '@/lib/posts';

const POSTS_PER_PAGE = 5;

export const GET = async (req: NextRequest) => {
  try {
    const params = req.nextUrl.searchParams;
    const limit = params.get('limit') ?? POSTS_PER_PAGE;
    const searchQuery = params.get('searchQuery') ?? '';
    const selectedTags = params.get('selectedTags') ?? '';
    let page = Number(params.get('page') ?? 1);

    let posts = await getPosts();

    if (searchQuery.trim()) {
      posts = posts.filter((post) =>
        post.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTags) {
      const tags = selectedTags
        .split(',')
        .map((str) => str.trim())
        .sort()
        .join(',');

      posts = posts.filter((post) =>
        post.tags?.sort().join(',').includes(tags)
      );
    }

    const totalPosts = [...posts];

    if (limit) {
      posts = posts.slice(POSTS_PER_PAGE * (page - 1), POSTS_PER_PAGE * page);
    }

    return Response.json(
      {
        data: {
          posts: [...posts],
          totalPages: Math.ceil(totalPosts.length / POSTS_PER_PAGE),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error, 'Error Iddhar');
    return new Response('Unexpected error, JK!', { status: 500 });
  }
};
