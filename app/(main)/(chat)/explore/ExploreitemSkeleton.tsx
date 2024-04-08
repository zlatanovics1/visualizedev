export default function ExploreItemSkeleton() {
  return (
    <li className="rounded-xl overflow-hidden shadow-md animate-pulse bg-gray-200">
      <div className="h-48 bg-gray-300"></div>
      <div className="h-56 p-4">
        <p className="bg-gray-300 w-36 mb-5 h-3"></p>

        <p className="bg-gray-300 w-full h-2 mb-2"></p>
        <p className="bg-gray-300 w-full h-2 mb-2"></p>
        <p className="bg-gray-300 w-full h-2 mb-2"></p>
        <p className="bg-gray-300 w-full h-2"></p>
        <div className="flex justify-end">
          <p className="mt-4 bg-gray-300 w-36 h-2"></p>
        </div>
      </div>
    </li>
  );
}
