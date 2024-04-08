import LoginForm from "@/components/ui/LoginForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up | Develop & Visualize",
  description: "Create your account, or log in as a guest",
};

export default function SignupPage() {
  return (
    <header className="pt-20 gap-20 p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center">
        Join the{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400 my-3 inline-block tracking-light">
          developers
        </span>{" "}
        community
      </h1>
      <main className="w-full max-w-2xl">
        <LoginForm type="signup" />
      </main>
    </header>
  );
}
