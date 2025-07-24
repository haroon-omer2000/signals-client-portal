import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { CustomMantineProvider } from "@/providers/MantineProvider";
import { ReduxProvider } from "@/providers/ReduxProvider";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Client Portal - Accountancy Firm",
  description: "A client onboarding portal for an accountancy firm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomMantineProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </CustomMantineProvider>
      </body>
    </html>
  );
}
