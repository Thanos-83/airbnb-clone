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
  title: 'Airbnb | Holiday rentals, cabins, beach houses & more...',
  description: 'A clone of the Airbnb platform',
};

export default async function RootLayout({
  children,
  loginModal,
  registerModal,
}) {
  const session = await getServerSession(authOptions);
  // console.log('Server Session in layout: ', session);
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          {!session?.user && (
            <>
              {registerModal}
              {loginModal}
            </>
          )}
          <Navbar />

          {children}

          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
