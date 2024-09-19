import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import UserProviderWrapper from "./dashboard/provider/userProvider";
import InterceptorHoc from "./hocs/interceptorHoc";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AppLayout from "./layer";
import { useAxiosSSRInterceptor } from "./dashboard/utils/serverSideFetcher";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useAxiosSSRInterceptor();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ margin: 0 }}
      >
        <AntdRegistry>
          <UserProviderWrapper>
            <InterceptorHoc>
              <AppLayout>{children}</AppLayout>
            </InterceptorHoc>
          </UserProviderWrapper>
        </AntdRegistry>
      </body>
    </html>
  );
}
