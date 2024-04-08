import UserHeader from "@/components/ui/chat/UserHeader";
import Link from "next/link";
import { HiArrowSmallLeft } from "react-icons/hi2";
import HeaderLogin from "@/components/ui/HeaderLogin";
import { getServerUserData } from "@/utils/auth/getServerUserData";
import DarkMode from "./../DarkMode";
import NavCollapse from "./../NavCollapse";

export default async function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getServerUserData();

  return (
    <>
      <DarkMode />

      <header className="px-4 py-4 items-center border-b-2 mb-2 border-b-gray-300  justify-between hidden sm:flex">
        <nav className="flex gap-10 flex-grow items-center">
          <Link href="/">
            <HiArrowSmallLeft className="w-6 h-6 cursor-pointer" />
          </Link>
          <NavCollapse />
        </nav>
        {user ? (
          <div className="flex gap-6">
            <UserHeader user={user} />
          </div>
        ) : (
          <HeaderLogin />
        )}
      </header>
      <main className="grid grid-cols-1 md:grid-rows-3 grid-rows-1 lg:grid-rows-1  lg:grid-cols-[1fr,2fr] sm:h-[150dvh]  lg:h-[80dvh] p-4 gap-4 overflow-y-scroll">
        {children}
      </main>
    </>
  );
}
