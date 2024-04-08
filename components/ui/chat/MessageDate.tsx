export default function MessageDate({ createdAt }: { createdAt: string }) {
  const date = new Date(createdAt);
  const localeDate = date.toLocaleDateString();
  const zeroBasedLocaleDate = localeDate
    .split("/")
    .map((el) => el.padStart(2, "0"))
    .join("/");

  return (
    <li className="relative border-t-2 rounded-t-full text-gray-300 text-sm border-t-gray-200 w-full max-w-96 self-center my-6">
      <div className="z-10 bg-gray-100 absolute inline-block px-2 -top-3 left-1/2 -translate-x-1/2">
        {zeroBasedLocaleDate}
      </div>
    </li>
  );
}
