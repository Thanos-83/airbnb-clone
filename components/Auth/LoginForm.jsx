'use client';

import { FaFacebookSquare } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Label } from '@radix-ui/react-dropdown-menu';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    reset,
    getValues,
  } = useForm();

  const handleLogin = async (data) => {
    console.log(data);

    await signIn('resend', { email: data.email });
    reset();
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className='space-y-6 py-4'>
          <div className='flex flex-col items-start gap-2'>
            <Label htmlFor='email' className='sr-only' />
            <Input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/,
                  message: 'The @ symbol must be included',
                },
              })}
              id='email'
              name='email'
              placeholder='Email'
              className='py-6'
            />
            {errors.email && (
              <small className='font-semibold text-red-600'>
                {errors.email.message}
              </small>
            )}
          </div>
        </div>
        <Button
          className='w-full bg-[#FF395C] py-6 font-bold text-lg'
          type='submit'>
          Continue with Email
        </Button>
      </form>
      <div className='mt-6 mb-6 '>
        <p className='overflow-hidden text-center relative before:w-full before:h-[2px] before:bg-slate-200 before:absolute before:top-1/2 before:-translate-y-[50%] before:translate-x-[50px] after:w-1/2 after:h-[2px] after:bg-slate-200 after:absolute after:top-1/2 after:-translate-y-[50%] after:left-0 after:-translate-x-[50px]'>
          OR
        </p>
      </div>
      <div className='space-y-4'>
        <Button
          onClick={() => signIn('facebook')}
          className='w-full flex items-center py-6 font-bold text-lg'
          variant='outline'
          disabled>
          <FaFacebookSquare className='mr-2 h-6 w-6 text-[#4267B2]' />
          <p className='text-center flex-1'>Continue with Facebook</p>
        </Button>
        <Button
          onClick={() => signIn('google')}
          className='w-full flex items-center py-6 font-bold text-lg'
          variant='outline'>
          <FaGoogle className='mr-2 h-6 w-6 text-[#EA4335]' />
          <p className='text-center flex-1'>Continue with Google</p>
        </Button>
        <Button
          onClick={() => signIn('github')}
          className='w-full flex items-center py-6 font-bold text-lg'
          variant='outline'
          disabled>
          <FaGithub className='mr-2 h-6 w-6' />
          <p className='text-center flex-1'>Continue with GitHub</p>
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
