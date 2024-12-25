'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import FormErrorMessage from '@/components/form-error-message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginFormInput, LoginFormSchema } from '@/lib/schemas';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const processForm: SubmitHandler<LoginFormInput> = async ({
    email,
    password,
  }) => {
    // const loginResponse = await signIn('credentials', {
    //   email,
    //   password,
    //   redirect: false,
    // });

    const loginResponse = {
      error: 'Error',
      ok: undefined,
    };

    if (loginResponse?.error) {
      toast.error(loginResponse.error);
      return;
    }

    if (loginResponse?.ok) {
      return router.push('/');
    }
  };

  return (
    <section className='relative isolate'>
      <div className='relative'>
        <form
          className='mt-16 lg:flex-auto'
          onSubmit={handleSubmit(processForm)}
          noValidate
        >
          <div className='flex flex-col gap-6 w-full'>
            {/* Email field */}
            <div className=''>
              <Input
                type='email'
                id='email'
                autoComplete='email'
                placeholder='Email'
                {...register('email')}
              />

              <FormErrorMessage message={errors?.email?.message} />
            </div>

            {/* Password field */}
            <div className='sm:col-span-2'>
              <Input
                type='password'
                id='password'
                autoComplete='current-password'
                placeholder='Password'
                {...register('password')}
              />
              <FormErrorMessage message={errors?.password?.message} />
            </div>
          </div>

          <div className='my-6'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='w-full disabled:opacity-50'
            >
              {isSubmitting ? 'Sending...' : 'Sign In'}
            </Button>
          </div>

          <Link
            href='/register'
            className='text-sm text-[#888] transition duration-150 ease hover:text-primary underline'
          >
            Do not have an account?
          </Link>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
