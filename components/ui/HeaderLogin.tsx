import Link from "next/link";
import { IoLogInOutline } from "react-icons/io5";

export default function HeaderLogin() {
  return (
    <Link
      href="/signup"
      className="hover:text-indigo-600 group flex flex-col mt-2"
    >
      <span className="flex items-center gap-1">
        Log in <IoLogInOutline className="w-5 h-5" />
      </span>
      <span className="w-0 h-2 border-t-2 border-t-indigo-600 group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
}
