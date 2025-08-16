'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import FormErrorMessage from '@/components/form-error-message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RegisterFormInput, RegisterFormSchema } from '@/lib/schemas';

// import { registerUser } from '@/database/actions/register';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(RegisterFormSchema),
  });

  const router = useRouter();

  const processForm: SubmitHandler<RegisterFormInput> = async ({
    email,
    password,
    name,
  }) => {
    // const registerResponse = await registerUser({
    //   email,
    //   password,
    //   name,
    // })
    //   .catch((res) => res)
    //   .finally(() => {
    //     reset();
    //   });

    const registerResponse = {
      error: 'Unexpected Error!',
      name: undefined,
      success: undefined,
    };

    if (registerResponse?.success && registerResponse?.name) {
      toast.success(
        `Welcome, ${registerResponse?.name}! Please login to continue...`
      );
      return router.push('/login');
    }

    toast.error(registerResponse.error);
    return;
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
            {/* Name field */}
            <div className=''>
              <Input
                autoComplete='name'
                id='name'
                placeholder='Name'
                type='name'
                {...register('name')}
              />

              <FormErrorMessage message={errors?.email?.message} />
            </div>

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
              {isSubmitting ? 'Sending...' : 'Register'}
            </Button>
          </div>

          <Link
            className='text-sm text-[#888] transition duration-150 ease hover:text-primary underline'
            href='/login'
          >
            I already have an account.
          </Link>
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;
