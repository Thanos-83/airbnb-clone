import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-satic';

async function RegisterPage() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/');
  }
  return <div>RegisterPage</div>;
}

export default RegisterPage;
