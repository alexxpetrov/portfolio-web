import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import { subscribeSSRInterceptor } from 'utils/serverSideFetcher';

import AppLayout from './layer';
import '@styles/globals.css';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alex Petrov',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  subscribeSSRInterceptor();

  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0 }}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
