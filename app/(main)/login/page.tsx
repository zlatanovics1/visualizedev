import LoginForm from "@/components/ui/LoginForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Develop & Visualize",
  description: "Log in to your account",
};

export default function LoginPage() {
  return (
    <header className="pt-20 gap-20 p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center text-gray-500">
        Log in to your account
      </h1>
      <main className="w-full max-w-2xl">
        <LoginForm type="login" />
      </main>
    </header>
  );
}
