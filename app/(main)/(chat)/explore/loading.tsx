import ExploreItemSkeleton from "./ExploreitemSkeleton";

export default function LoadingNews() {
  return (
    <ul className="px-12 grid items-center gap-x-8 gap-y-12  grid-cols-1 xsm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
      {Array.from({ length: 10 }, (i: number) => (
        <ExploreItemSkeleton key={i} />
      ))}
      ;
    </ul>
  );
}
