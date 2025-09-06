"use client";

import { signIn } from "next-auth/react";
import Button from "./Button";

export default function LoginForm() {
  return (
    <div className="bg-white shadow-sm rounded-md w-[400px] p-10 text-center">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      <Button
        label="Sign in with Google"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="bg-red-500 hover:bg-red-600"
      />
    </div>
  );
}
