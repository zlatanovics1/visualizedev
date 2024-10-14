"use client";
import { loginUser, signupUser } from "@/app/actions/auth/action";
import { loginWithOAuth } from "@/app/actions/auth/clientActions";
import { LoginData, loginSchema } from "@/types/form-validation-types";

import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import LoaderSmall from "./LoaderSmallCenter";
import { useDisableEnterKey } from "@/hooks/useDisableEnterKey";
import { timeout } from "@/utils/helpers";

export default function LoginForm({ type }: { type: string }) {
  const [activeUsername, setActiveUsername] = useState(false);
  const [activeEmail, setActiveEmail] = useState(false);
  const [activePass, setActivePass] = useState(false);
  const [isLoadingOAuth, setIsLoadingOAuth] = useState({
    isLoading: false,
    provider: "",
  });
  const signupSession = type === "signup";
  const formRef = useDisableEnterKey();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema) });
  function handleToggleActive(
    e: ChangeEvent<HTMLInputElement>,
    setter: typeof setActiveUsername,
    field: boolean
  ) {
    if (e.currentTarget.value && !field) setter(true);
    if (!e.currentTarget.value && field) setter(false);
  }

  async function onSubmit(data: LoginData) {
    let result: { success: boolean };
    if (signupSession) result = await signupUser(data);
    else result = await loginUser(data);
    if (!result?.success && result !== undefined)
      toast.error(
        signupSession ? "Failed to create acccont" : "Invalid login credentials"
      );
    reset();
  }

  async function handleGoogleAuth() {
    setIsLoadingOAuth({ isLoading: true, provider: "google" });
    const result = await loginWithOAuth("google");
    if (!result?.success && result !== undefined)
      toast.error("Failed to login with google. Please try again!");
    setIsLoadingOAuth({ isLoading: false, provider: "" });
  }
  async function handleGitHubAuth() {
    setIsLoadingOAuth({ isLoading: true, provider: "github" });
    const result = await loginWithOAuth("github");
    await timeout(2000); // simulate loading indicator since redirect happens in the background (on the server)
    if (!result?.success && result !== undefined)
      toast.error("Failed to login with github. Please try again!");
    setIsLoadingOAuth({ isLoading: false, provider: "" });
  }

  return (
    <form
      className="flex flex-col md:flex-row flex-wrap items-center gap-y-8  rounded-xl shadow-xl p-8 bg-white"
      onSubmit={handleSubmit(onSubmit)}
      ref={formRef}
    >
      <div className="space-y-6  w-full md:w-1/2">
        {signupSession && (
          <div className=" relative">
            <input
              autoComplete="off"
              type="text"
              id="username"
              className={` ${
                errors.username && " border-red-500"
              } w-[95%] bg-white rounded-md p-2  border-2 border-gray-300 peer focus:outline-2 focus:outline-indigo-400`}
              {...register("username")}
              onChange={(e) =>
                handleToggleActive(e, setActiveUsername, activeUsername)
              }
            />
            <label
              htmlFor="username"
              className={`bg-white text-gray-300  absolute ${
                activeUsername ? "-top-[10px] text-sm" : "top-2"
              } left-3 peer-focus:-top-[10px] transition-all duration-300 peer-focus:text-sm peer-focus:text-indigo-400 ${
                errors.username && "text-red-500"
              }`}
            >
              Username
            </label>
            {errors.username && (
              <p className="mt-1 ml-2 text-xs text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>
        )}
        <div className=" relative">
          <input
            autoComplete="off"
            type="email"
            id="email"
            {...register("email")}
            onChange={(e) => handleToggleActive(e, setActiveEmail, activeEmail)}
            className={`w-[95%] bg-white rounded-md p-2 border-2  border-gray-300 peer focus:outline-2 focus:outline-indigo-400 ${
              errors.email && " border-red-500"
            }`}
          />
          <label
            htmlFor="email"
            className={`${
              activeEmail ? "-top-[10px] text-sm" : "top-2"
            }  bg-white text-gray-300 absolute left-3 peer-focus:-top-[10px] transition-all ${
              errors.email && "text-red-500"
            } duration-300 peer-focus:text-sm peer-focus:text-indigo-400`}
          >
            Email
          </label>
          {errors.email && (
            <p className="mt-1 ml-2 text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className=" relative">
          <input
            type="password"
            id="password"
            autoComplete="off"
            {...register("password")}
            onChange={(e) => handleToggleActive(e, setActivePass, activePass)}
            className={`${
              errors.password && " border-red-500"
            } w-[95%] bg-white rounded-md p-2 border-2  border-gray-300 peer focus:outline-2 focus:outline-indigo-400`}
          />
          <label
            htmlFor="password"
            className={`bg-white text-gray-300 absolute ${
              activePass ? "-top-[10px] text-sm" : "top-2"
            } left-3 peer-focus:-top-[10px] transition-all duration-300 peer-focus:text-sm peer-focus:text-indigo-400 ${
              errors.password && "text-red-500"
            }`}
          >
            Password
          </label>
          {errors.password && (
            <p className="mt-1 ml-2 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 w-full md:w-1/2">
        <button
          className="flex gap-2 rounded-full p-2 shadow-md focus:outline-2 focus:outline-indigo-400 hover:text-indigo-500 transition-all duration-300"
          onClick={handleGoogleAuth}
          type="button"
        >
          {isLoadingOAuth.provider === "google" ? (
            <LoaderSmall white />
          ) : (
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-6 h-6"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              ></path>
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              ></path>
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              ></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
          )}
          <span>Continue with Google</span>
        </button>
        <button
          className="flex items-center gap-2 rounded-full p-2 shadow-md focus:outline-2 focus:outline-indigo-400 hover:text-indigo-500 transition-all duration-300"
          onClick={handleGitHubAuth}
          type="button"
        >
          {isLoadingOAuth.provider === "github" ? (
            <LoaderSmall white />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          )}
          <span>Continue with GitHub</span>
        </button>
      </div>
      <div className="w-full flex flex-col items-center gap-3 mt-4">
        <button
          type="submit"
          className="rounded-md border-0 bg-indigo-500 text-white px-4 py-2 w-60 hover:bg-indigo-600 transition-all duration-300"
        >
          {isSubmitting ? (
            <LoaderSmall white />
          ) : signupSession ? (
            "Sign up"
          ) : (
            "Log in"
          )}
        </button>
        <Link
          href={signupSession ? `/` : "/signup"}
          className="text-indigo-400 hover:text-indigo-500 transition-all duration-300 group flex flex-col"
        >
          <span>
            {signupSession ? "Guest log in" : "Create account instead"}
          </span>
          <span className="w-0 h-2 border-t-2 border-t-indigo-500 group-hover:w-full transition-all duration-300"></span>
        </Link>
        {signupSession && (
          <Link
            href="/login"
            className="text-gray-500 hover:text-indigo-300 transition-all duration-300 text-sm"
          >
            I already have an account
          </Link>
        )}
      </div>
    </form>
  );
}
