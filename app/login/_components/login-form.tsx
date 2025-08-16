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
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginFormSchema),
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
          noValidate
          onSubmit={handleSubmit(processForm)}
        >
          <div className='flex flex-col gap-6 w-full'>
            {/* Email field */}
            <div className=''>
              <Input
                autoComplete='email'
                id='email'
                placeholder='Email'
                type='email'
                {...register('email')}
              />

              <FormErrorMessage message={errors?.email?.message} />
            </div>

            {/* Password field */}
            <div className='sm:col-span-2'>
              <Input
                autoComplete='current-password'
                id='password'
                placeholder='Password'
                type='password'
                {...register('password')}
              />
              <FormErrorMessage message={errors?.password?.message} />
            </div>
          </div>

          <div className='my-6'>
            <Button
              className='w-full disabled:opacity-50'
              disabled={isSubmitting}
              type='submit'
            >
              {isSubmitting ? 'Sending...' : 'Sign In'}
            </Button>
          </div>

          <Link
            className='text-sm text-[#888] transition duration-150 ease hover:text-primary underline'
            href='/register'
          >
            Do not have an account?
          </Link>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
