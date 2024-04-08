import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IoChatboxOutline,
  IoGlobeOutline,
  IoNewspaper,
  IoPeopleOutline,
  IoSettingsOutline,
} from "react-icons/io5";

export default function SideBarLinks() {
  const pathname = usePathname();
  return (
    <>
      <Link
        key="/"
        href="/"
        className={`${
          pathname === "/" ? "text-indigo-500  translate-x-1" : "text-gray-500"
        } cursor-pointer flex  px-2 py-2 gap-3 items-center group transition-all duration-300 border-l-2 border-l-transparent hover:border-l-2 hover:border-l-indigo-500 hover:translate-x-1 hover:text-indigo-500`}
      >
        <IoGlobeOutline
          className={`${
            pathname === "/" ? "text-indigo-500" : "text-gray-400"
          } w-6 h-6 group-hover:text-indigo-500 transition-all duration-300`}
        />
        <span className="text-xl">Global</span>
      </Link>
      <Link
        href="/explore"
        key="/explore"
        className={`${
          pathname === "/explore"
            ? "text-indigo-500  translate-x-1"
            : "text-gray-500"
        } cursor-pointer flex  px-2 py-2 gap-3 items-center group transition-all duration-300 border-l-2 border-l-transparent hover:border-l-2 hover:border-l-indigo-500 hover:translate-x-1 hover:text-indigo-500`}
      >
        <IoNewspaper
          className={`${
            pathname === "/explore" ? "text-indigo-500" : "text-gray-400"
          } w-6 h-6 group-hover:text-indigo-500 transition-all duration-300`}
        />
        <span className="text-xl">Explore</span>
      </Link>
      <Link
        href="/channels"
        key="/channels"
        className={`${
          pathname.includes("/channels")
            ? "text-indigo-500  translate-x-1"
            : "text-gray-500"
        } cursor-pointer flex  px-2 py-2 gap-3 items-center group transition-all duration-300 border-l-2 border-l-transparent hover:border-l-2 hover:border-l-indigo-500 hover:translate-x-1 hover:text-indigo-500`}
      >
        <IoChatboxOutline
          className={`${
            pathname.includes("/channels") ? "text-indigo-500" : "text-gray-400"
          } w-6 h-6 group-hover:text-indigo-500 transition-all duration-300`}
        />
        <span className="text-xl">Channels</span>
      </Link>
      <Link
        href="/friends"
        key="/friends"
        className={`${
          pathname === "/friends"
            ? "text-indigo-500  translate-x-1"
            : "text-gray-500"
        } cursor-pointer flex  px-2 py-2 gap-3 items-center group transition-all duration-300 border-l-2 border-l-transparent hover:border-l-2 hover:border-l-indigo-500 hover:translate-x-1 hover:text-indigo-500`}
      >
        <IoPeopleOutline
          className={`${
            pathname === "/friends" ? "text-indigo-500" : "text-gray-400"
          } w-6 h-6 group-hover:text-indigo-500 transition-all duration-300`}
        />
        <span className="text-xl">Friends</span>
      </Link>
      <Link
        href="/settings"
        key="/settings"
        className={`${
          pathname === "/settings"
            ? "text-indigo-500  translate-x-1"
            : "text-gray-500"
        } cursor-pointer flex  px-2 py-2 gap-3 items-center group transition-all duration-300 border-l-2 border-l-transparent hover:border-l-2 hover:border-l-indigo-500 hover:translate-x-1 hover:text-indigo-500`}
      >
        <IoSettingsOutline
          className={`${
            pathname === "/settings" ? "text-indigo-500" : "text-gray-400"
          } w-6 h-6 group-hover:text-indigo-500 transition-all duration-300`}
        />
        <span className="text-xl">Settings</span>
      </Link>
    </>
  );
}
