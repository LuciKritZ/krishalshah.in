import { NextRequest } from 'next/server';

import { getTags } from '@/lib/posts';

export const GET = async (req: NextRequest) => {
  try {
    const params = req.nextUrl.searchParams;
    const limit = Number(params.get('limit'));
    const tags = await getTags(limit);

    return Response.json({ data: tags }, { status: 200 });
  } catch (error: any) {
    return new Response('Unexpected error, JK!', { status: 500 });
  }
};
