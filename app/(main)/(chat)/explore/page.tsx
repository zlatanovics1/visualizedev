import { exploreData } from "@/client-config/explore-items";
import ExploreList from "./ExploreList";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Explore latest news about programming and artificial intelligence.",
};

function filterExploreData(query: string | undefined) {
  switch (query) {
    case "prog":
      return exploreData.programming;
    case "ai":
      return exploreData.ai;

    default:
    case "all":
      return [...exploreData.ai, ...exploreData.programming].sort(() =>
        Math.random() > 0.5 ? 1 : -1
      );
  }
}

export default async function News({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined;
  };
}) {
  const filteredData = filterExploreData(searchParams.explore_filter);
  return <ExploreList data={filteredData} />;
}
