// 'use client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Container from '@/components/Container';
import { getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export const dynamic = 'auto';

async function LoginPage() {
  // const { data: session } = useSession();
  const session = await getServerSession(authOptions);
  // console.log('Session in login page: ', session);
  if (session?.user) {
    redirect('/');
  }
  return (
    <div>
      <Container>Login Page</Container>
    </div>
  );
}

export default LoginPage;
