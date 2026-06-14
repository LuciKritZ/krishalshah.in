import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { dbConnection } from '@/database/db-connection';
import Admin from '@/database/models/admin';
import { comparePassword, hashPassword, signToken } from '@/lib/server/auth';

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
  return NextResponse.json({ message: 'Logged out successfully' });
}

export async function POST(req: Request) {
  try {
    await dbConnection();
    const body = await req.json();
    const { action, email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (action === 'register') {
      const allowedEmails = (
        process.env.ADMIN_EMAILS ||
        process.env.ADMIN_EMAIL ||
        ''
      )
        .split(',')
        .map(e => e.trim().toLowerCase());
      if (!allowedEmails.includes(email.toLowerCase())) {
        return NextResponse.json(
          { error: 'Unauthorized email' },
          { status: 403 }
        );
      }

      const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
      if (existingAdmin) {
        return NextResponse.json(
          { error: 'Admin already exists' },
          { status: 400 }
        );
      }

      const passwordHash = await hashPassword(password);
      await Admin.create({ email: email.toLowerCase(), passwordHash });

      return NextResponse.json({ message: 'Admin registered successfully' });
    }

    // Login flow
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isMatch = await comparePassword(password, admin.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = signToken({ email: admin.email, id: admin._id });

    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return NextResponse.json({ message: 'Logged in successfully' });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
