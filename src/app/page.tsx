"use client";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import StateDropdown from "@/components/StateDropdown";
import TopicsDropdown from "@/components/TopicsDropdown";
import { Response } from "./api/news/route";
import { NewsArticle } from "@prisma/client";
import ArticleCard from "@/components/ArticleCard";
import Paginator from "@/components/Paginator";

/**
 * Home component that fetches and displays news articles based on search criteria and filters.
 */
export default function Home() {
  // State to store the list of articles
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  // State to store the search query
  const [searchResults, setSearchResults] = useState<string>("");
  // State to store the selected state filter
  const [state, setState] = useState<string>("");
  // State to store the selected topic filter
  const [topic, setTopic] = useState<string>("");
  // State to store the current page number for pagination
  const [page, setPage] = useState<number>(1);
  // Ref to store the total number of articles
  const totalArticles = useRef<number>(0);

  // useEffect to fetch articles whenever searchResults, state, topic, or page changes
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const resp = await fetch(
          `/api/news?search=${searchResults}&state=${state}&topic=${topic}&page=${page}`
        );
        const json: Response = await resp.json();
        console.log("Fetched articles:", json);
        // Update the articles state with the fetched data
        const _articles = json.data;
        // Update the total number of articles
        totalArticles.current = json.meta.total;
        setArticles(_articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    // Call the fetchArticles function whenever searchResults, state, topic, or page changes
    fetchArticles();
  }, [searchResults, state, topic, page]);

  // Function to handle search input change
  function onChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchResults(e.target.value);
  }

  // Function to handle state filter selection
  function onStateSelect(state: string) {
    if (state === "Select a State") {
      return setState("");
    }
    setState(state);
  }

  // Function to handle topic filter selection
  function onTopicSelect(topic: string) {
    if (topic === "Select a Topic") {
      return setTopic("");
    }
    setTopic(topic);
  }

  // Function to fetch new articles
  async function getNewArticles() {
    await fetch("/api/news/import");
  }

  return (
    <main>
      <div dta-name="homepage-container" className="flex flex-col p-8 ">
        <div data-name="filter-container" className="flex items-center gap-x-3">
          <div className="w-1/3 sm:w-1/2">
            {/* Search bar component */}
            <SearchBar onChange={onChangeSearch} />
          </div>

          <div className="flex w-1/6 sm:w-1/3">
            {/* State dropdown component */}
            <StateDropdown label="State" onSelect={onStateSelect} />
            {/* Topics dropdown component */}
            <TopicsDropdown label="Topic" onSelect={onTopicSelect} />
          </div>

          {/* Button to fetch new articles */}
          <button
            onClick={getNewArticles}
            className="ml-auto w-1/4 text-black text-sm bg-white rounded-md p-1 sm:p-3"
          >
            Get New Articles
          </button>
        </div>

        <div
          data-name="article-cards-container"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10 mt-10 p-2"
        >
          {/* Display a message if no articles are found */}
          {articles.length === 0 ? (
            <p>No articles found</p>
          ) : (
            // Map through the articles and render an ArticleCard for each article
            articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          )}
        </div>
        {/* Paginator component for pagination */}
        <Paginator
          page={page}
          totalArticles={totalArticles}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </main>
  );
}
