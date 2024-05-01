import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Container from '@/components/Container';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-static';

async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/');
  }
  return (
    <div>
      <Container>LoginPage</Container>
    </div>
  );
}

export default LoginPage;
