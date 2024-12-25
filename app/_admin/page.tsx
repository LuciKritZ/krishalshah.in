'use client';

import { useEffect } from 'react';

import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';

import EditExperience from './_components/edit-experience';
import EditIntro from './_components/edit-intro';

const AdminPage = () => {
  const { status } = { status: 'unauthenticated' };
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [router, status]);

  if (status === 'loading') {
    return <Loader className='size-5' />;
  }

  return (
    <section className=''>
      <div className='container max-w-3xl'>
        <EditIntro />

        <EditExperience />
      </div>
    </section>
  );
};

export default AdminPage;
