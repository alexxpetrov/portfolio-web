'use client';

import { Inter } from 'next/font/google';

import AppLayout from './layer';
import '@styles/globals.css';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900`} style={{ margin: 0 }}>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
