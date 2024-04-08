import { exploreObject } from "@/client-config/explore-items";
import Image from "next/image";

export default function NewsItem({ article }: { article: exploreObject }) {
  const newsText = article.text.slice(0, 150);

  return (
    <li className="rounded-xl overflow-hidden border-2 shadow-md relative hover:border-gray-300 transition-all duration-300">
      {Math.random() < 0.3 && (
        <span className="absolute z-10 top-2 left-2 rounded-full  text-indigo-50 bg-gradient-to-r from-indigo-600 to-violet-500 px-3 py-1">
          Trending
        </span>
      )}
      <a
        href={article.url}
        target="_blank"
        className="relative group h-48 block"
      >
        {article.image && (
          <Image
            fill
            src={article.image}
            alt={article.title}
            className="object-cover"
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-transparent text-transparent group-hover:text-preserve-white transition-all duration-300 group-hover:bg-black/50 z-30 flex items-center justify-center"
        >
          See more
        </div>
      </a>
      <div className="p-4 pt-10">
        <h3 className="font-semibold mb-6 text-xl">{article.title}</h3>
        <p className="mb-2 italic text-gray-500">
          {article.text.length <= 150 ? (
            article.text
          ) : (
            <>
              <span>{newsText}</span>
              <a
                href={article.url}
                target="_blank"
                className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-400"
              >
                ...See more
              </a>
            </>
          )}
        </p>
        {/* <p className="text-right italic">{article.author}</p> */}

        {/* <div className="relative h-10 w-10 mt-4">
          <Image
            fill
            alt={`Flag of news source country (${article.source_country})`}
            src={`https://flagsapi.com/${article.source_country.toUpperCase()}/flat/64.png`}
            className="object-cover text-sm"
          />
        </div> */}
      </div>
    </li>
  );
}
