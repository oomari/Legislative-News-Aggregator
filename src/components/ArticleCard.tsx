import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import ExpandButton from "./ExpandButton";
import { NewsArticle } from "@prisma/client";

/*
 * ArticleCard component
 */
function ArticleCard({ article }: { article: NewsArticle }) {
  return (
    <div
      data-name="article-card"
      className="hover:bg-slate-600 hover:cursor-pointer border border-gray-200 rounded-2xl flex flex-col gap-y-2 w-full overflow-hidden"
      key={article.id}
    >
      {/* Link to the article's detailed page */}
      <Link href={`/article/${article.id}`}>
        {/* Display the article's image */}
        <img
          src={article.imageUrl || undefined}
          className="w-full sm:h-32 md:h-40 xl:h-64 object-cover"
        />
      </Link>

      {/* Container for article details */}
      <div
        data-name="article-card-details"
        className="text-xs text-white flex flex-col gap-y-2 p-2 lg:p-3"
      >
        {/* Display the article's title */}
        <h1 className="font-bold text-base sm:text-lg lg:text-xl">
          {article.title}
        </h1>
        {/* Display the article's publication date */}
        <time>
          {format(new Date(article.publishedAt), "MMMM d, yyyy 'at' h:mm a")}
        </time>
        <div className="flex justify-between">
          {/* Display the article's state */}
          <h3>{article.state}</h3>
          {/* Display the article's topic */}
          <p className="italic">
            {article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}
          </p>
        </div>
        {/* ExpandButton component to show the article's description */}
        <ExpandButton desc={article.description || undefined} />
      </div>
    </div>
  );
}

export default ArticleCard;
