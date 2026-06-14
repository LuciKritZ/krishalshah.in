'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth', {
        body: JSON.stringify({
          action: 'register',
          email,
          password,
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      setMessage('Registration successful! You can now log in.');
      setPassword('');
      // Optionally redirect after a few seconds
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-background px-4'>
      <div className='w-full max-w-md p-8 border border-border rounded-xl bg-surface'>
        <h1 className='text-2xl font-bold mb-6 text-center'>
          Admin Registration
        </h1>

        {error && (
          <div className='mb-4 p-3 bg-red-500/10 border border-red-500/50 text-red-500 rounded text-sm'>
            {error}
          </div>
        )}
        {message && (
          <div className='mb-4 p-3 bg-green-500/10 border border-green-500/50 text-green-500 rounded text-sm'>
            {message}
          </div>
        )}

        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <label className='block text-sm mb-1 text-content-secondary'>
              Email
            </label>
            <input
              className='w-full px-3 py-2 bg-background border border-border rounded-md text-content-primary'
              onChange={e => setEmail(e.target.value)}
              required
              type='email'
              value={email}
            />
          </div>
          <div>
            <label className='block text-sm mb-1 text-content-secondary'>
              Password
            </label>
            <input
              className='w-full px-3 py-2 bg-background border border-border rounded-md text-content-primary'
              onChange={e => setPassword(e.target.value)}
              required
              type='password'
              value={password}
            />
          </div>

          <button
            className='mt-4 w-full bg-brand text-white font-semibold py-2 rounded-md hover:bg-brand/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            disabled={isLoading}
            type='submit'
          >
            {isLoading ? 'Please wait...' : 'Register'}
          </button>
        </form>

        <div className='mt-6 text-center'>
          <Link
            className='text-sm text-content-tertiary hover:text-content-primary transition-colors'
            href='/login'
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
