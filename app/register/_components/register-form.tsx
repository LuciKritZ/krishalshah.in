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
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
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
      success: undefined,
      name: undefined,
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
          onSubmit={handleSubmit(processForm)}
          noValidate
        >
          <div className='flex flex-col gap-6 w-full'>
            {/* Name field */}
            <div className=''>
              <Input
                type='name'
                id='name'
                autoComplete='name'
                placeholder='Name'
                {...register('name')}
              />

              <FormErrorMessage message={errors?.email?.message} />
            </div>

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
              {isSubmitting ? 'Sending...' : 'Register'}
            </Button>
          </div>

          <Link
            href='/login'
            className='text-sm text-[#888] transition duration-150 ease hover:text-primary underline'
          >
            I already have an account.
          </Link>
        </form>
      </div>
    </section>
  );
};

export default RegisterForm;
