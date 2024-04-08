import { exploreObject } from "@/client-config/explore-items";
import ExploreItem from "./ExploreItem";
export default function ExploreList({ data }: { data: exploreObject[] }) {
  return (
    <ul className="px-12 grid items-center gap-x-8 gap-y-12  grid-cols-1 xsm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
      {data.map((article) => (
        <ExploreItem article={article} key={article.id} />
      ))}
    </ul>
  );
}
