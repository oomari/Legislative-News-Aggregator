"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { NewsArticle } from "@prisma/client";
import ArticleCard from "@/components/ArticleCard";

/*
 * Page component to display the article and suggested articles
 */
function Page() {
  // State to store the fetched article
  const [article, setArticle] = useState<NewsArticle | null>(null);
  // State to store the list of suggested articles
  const [suggestedArticles, setSuggestedArticles] = useState<NewsArticle[]>([]);
  // Variable to extract the article ID from the URL parameters
  const { id } = useParams<{ id: string }>();

  // Effect to fetch the article based on the ID from the URL
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Fetch the article from the API using the ID
        const resp = await fetch(`/api/news/${id}`);
        const json = await resp.json();
        const _article: NewsArticle = json;
        // Update the article state with the fetched data
        setArticle(_article);
      } catch (error) {
        console.error("Failed to fetch article:", error);
      }
    };
    // Call the fetchArticle function if the ID is available
    if (id) {
      fetchArticle();
    }
  }, [id]);

  // Effect to fetch suggested articles whenever the article changes
  useEffect(() => {
    const fetchSuggestedArticles = async () => {
      try {
        // Fetch suggested articles from the API
        const resp = await fetch(`/api/news`);
        const json = await resp.json();
        const _suggestedArticles: NewsArticle[] = json.data;
        setSuggestedArticles(_suggestedArticles);
      } catch (error) {
        console.error("Failed to fetch suggested articles:", error);
      }
    };
    // Call the fetchSuggestedArticles function whenever the article changes
    fetchSuggestedArticles();
  }, [article]);

  if (!article) {
    return <div>No Article Found...</div>;
  }
  // Shuffle the suggested articles
  const shuffledArticles = suggestedArticles.sort(() => 0.5 - Math.random());
  // Render the article and suggested articles
  return (
    <div
      data-name="article-page"
      className="flex flex-col max-w-5xl items-center gap-y-8 mx-auto p-8"
    >
      <div data-name="article-container">
        <div className="flex w-full pb-4">
          {/* Back button to navigate to the previous page */}
          <Link href="/">
            <ArrowLeftIcon className="size-8 text-white" />
          </Link>
        </div>
        <div
          data-name="article-content"
          className="border-2 text-white border-white rounded-md "
        >
          <div className="flex flex-col p-4">
            <h1 className="font-extrabold text-3xl">{article?.title}</h1>
            <time>{new Date(article?.publishedAt).toLocaleString()}</time>
          </div>
          <div className="relative aspect-video">
            {/* Display the article if it is available */}
            {article && (
              <Image src={article.imageUrl} alt="article image" fill />
            )}
          </div>
          <div className="flex flex-col gap-y-2  text-sm p-4">
            <div className="flex justify-between">
              <h3>{article?.state}</h3>
              <p className="italic">
                {article.topic.charAt(0).toUpperCase() + article.topic.slice(1)}
              </p>
            </div>
            <p className="text-lg">{article?.description}</p>
          </div>
        </div>
      </div>
      {/* Display suggested articles */}
      <div
        data-name="suggested-articles-container"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl gap-6"
      >
        {shuffledArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default Page;
