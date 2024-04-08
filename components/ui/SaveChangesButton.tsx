import { BiLoaderAlt } from "react-icons/bi";

export default function SaveChangesButton({
  className,
}: {
  className?: string;
}) {
  return (
    <button
      className={`px-3 py-1 rounded-md bg-indigo-500 border-2 hover:bg-gray-100 hover:text-indigo-500 hover:border-indigo-500 transition-all duration-300 ${className}`}
    >
      Save changes
    </button>
  );
}
