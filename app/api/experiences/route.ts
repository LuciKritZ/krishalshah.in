import { sanitize } from 'isomorphic-dompurify';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { dbConnection } from '@/database/db-connection';
import Experience from '@/database/models/experience';
import { verifyToken } from '@/lib/server/auth';

export async function GET() {
  try {
    await dbConnection();
    // Sort by startDate descending
    const experiences = await Experience.find().sort({ startDate: -1 });
    return NextResponse.json(experiences);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnection();
    const body = await req.json();

    if (body.description) {
      body.description = sanitize(body.description);
    }

    const newExperience = await Experience.create(body);

    return NextResponse.json(newExperience, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 400 }
    );
  }
}
