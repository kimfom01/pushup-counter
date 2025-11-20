import { Button } from "@/components/ui/button";
import { SignedOut, SignedIn, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr] justify-center items-center h-full w-full p-16">
      <h1 className="text-4xl text-center font-bold">Count Your Push-Ups</h1>
      <div className="w-full place-self-center font-semibold text-xl flex flex-col items-center">
        <SignedOut>
          <SignInButton>
            <Button className="text-xl">Get Started</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href={"/home"}>
            <Button className="text-xl">Start Counting</Button>
          </Link>
        </SignedIn>
      </div>
    </div>
  );
}
