import { BiLoaderAlt } from "react-icons/bi";

export default function LoaderSmallCenter({ white }: { white: boolean }) {
  return (
    <p className="flex items-center justify-center">
      <BiLoaderAlt className={`animate-spin ${!white && "text-indigo-600"}`} />
    </p>
  );
}
