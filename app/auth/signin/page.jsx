import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

async function LoginPage() {
  const session = await getServerSession(authOptions)
  if(session?.user) {
    redirect('/')
  }
  return (
    <div>LoginPage</div>
  )
}

export default LoginPage