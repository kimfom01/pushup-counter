import { SignIn } from "@clerk/nextjs";

const Login = () => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <SignIn />
    </div>
  );
};

export default Login;
