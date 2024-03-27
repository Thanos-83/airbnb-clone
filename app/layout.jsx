// import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/AuthProvider';
import Navbar from '../components/Navbar/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { Toaster } from '@/components/ui/sonner';
import 'mapbox-gl/dist/mapbox-gl.css';
// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb Clone',
  description: 'A clone of the airvbnb platform',
};

export default async function RootLayout({
  children,
  loginModal,
  registerModal,
}) {
  const session = await getServerSession(authOptions);
  // console.log('Server Session: ',session);
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <Navbar session={session} />
          {/* <div> */}
          {children}
          {/* {registerModal} */}
          {/* {loginModal} */}

          {!session?.user && (
            <>
              {registerModal}
              {loginModal}
            </>
          )}
          {/* </div> */}
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
