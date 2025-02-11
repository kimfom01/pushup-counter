import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Link from "next/link";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pushup Counter",
  description: "Count Your Push-Ups",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="mx-auto container grid grid-rows-[auto_1fr] p-4 h-screen w-screen">
              <div className="h-fit w-full flex justify-between items-center">
                <div className="text-xl md:text-3xl font-bold">
                  <SignedIn>
                    <Link href={"/home"}>Pushup Counter</Link>
                  </SignedIn>
                  <SignedOut>
                    <Link href={"/"}>Pushup Counter</Link>
                  </SignedOut>
                </div>
                <div className="flex gap-4 font-bold items-center">
                  <div className="hidden md:block">
                    <Link href={"/home"}>Home</Link>
                  </div>
                  <Link href={"/leaderboard"}>Leaderboard</Link>
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
              </div>
              <div className="h-full w-full">{children}</div>
            </div>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
