import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Pushup Counter",
  description: "Count Your Push-Ups",
};

const Login = () => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <SignIn />
    </div>
  );
};

export default Login;
