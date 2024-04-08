"use client";
import Filter from "@/components/ui/Filter";
import { MutableRefObject, useRef } from "react";

export default function NewsHeader() {
  const newsHeaderRef =
    useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;

  /* useEffect(function () {
    const newsHeader = document.getElementById("newsHeaderIntersection")!;
    function observerCallback(
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) {
      const [entry] = entries;
      console.log(entry);
      if (entry.isIntersecting) {
        newsHeaderRef.current.classList.remove("fixed-top-left");
      } else {
        newsHeaderRef.current.classList.add("fixed-top-left");
        observer.unobserve(newsHeader);
      }
    }
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.1,
      rootMargin: "100px",
    });

    observer.observe(newsHeader);
  }, []);*/

  return (
    <div
      ref={newsHeaderRef}
      className="p-6  border-b-2 flex justify-between gap-4 items-center flex-wrap fixed-top-left"
    >
      <h1 className="font-bold text-3xl text-gray-600">Explore news in tech</h1>
      <Filter
        searchParam="explore_filter"
        options={[
          { label: "All", value: "all" },
          { label: "Programming", value: "prog" },
          { label: "AI", value: "ai" },
        ]}
      />
    </div>
  );
}
