import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { verifyToken } from '@/lib/server/auth';

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) {
    redirect('/login');
  }

  const payload = verifyToken(token);
  if (!payload) {
    redirect('/login');
  }

  return (
    <div className='min-h-screen bg-background'>
      <header className='border-b border-border bg-surface px-6 py-4 flex justify-between items-center'>
        <h1 className='text-xl font-bold'>Admin Dashboard</h1>
        <div className='flex gap-4 items-center'>
          <span className='text-sm text-content-secondary'>
            {(payload as { email?: string }).email}
          </span>
          <form
            action={async () => {
              'use server';
              const cookieStore = await cookies();
              cookieStore.delete('admin_token');
              redirect('/login');
            }}
          >
            <button className='text-sm text-red-500 hover:underline'>
              Logout
            </button>
          </form>
        </div>
      </header>
      <main className='p-6'>{children}</main>
    </div>
  );
}
