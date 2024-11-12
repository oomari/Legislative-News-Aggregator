"use client";
import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import Link from "next/link";

export type Article = {
  id: number;
  title: string;
  publishedAt: string;
  state: string;
  topic: string;
  description: string;
  articleUrl: string;
  imageUrl: string;
};

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const resp = await fetch(`/api/news`);
        const json = await resp.json();
        console.log("Fetched articles:", json); // Log the fetched data
        const _articles: Article[] = json; // Ensure the fetched data matches the Article type
        setArticles(_articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <main className="">
      <div className="flex flex-col p-8 ">
        <div className="flex justify-around">
          <input
            type="text"
            placeholder="Search..."
            className="w-3/5 border rounded-sm p-2"
          />
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Filter
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 h-5 w-5 text-gray-400"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <label className="flex items-center p-2">
                    <input
                      type="checkbox"
                      className="m-2 hover:cursor-pointer block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-300 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    />
                    State
                  </label>
                </MenuItem>
              </div>

              <div className="py-1">
                <MenuItem>
                  <label className="flex items-center p-2">
                    <input
                      type="checkbox"
                      className="m-2 hover:cursor-pointer block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-300 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    />
                    Topic
                  </label>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>

        <div className=" grid grid-cols-4 gap-6 mt-10 p-2">
          {articles.length === 0 ? (
            <p>No articles found</p>
          ) : (
            articles.map((article) => (
              <div
                data-name="article-card"
                className="border-2 border-white rounded-md flex flex-col gap-y-2"
                key={article.id}
              >
                <Link href={`/article/${article.id}`}>
                  <img
                    src={article.imageUrl}
                    className="w-full border-b border-gray-500"
                  />
                </Link>
                <div
                  data-name="article-card-details"
                  className="text-xs text-white flex flex-col gap-y-2 p-2"
                >
                  <h2>{article.title}</h2>
                  <time>{article.publishedAt}</time>
                  <h3>{article.state}</h3>
                  <p>{article.topic}</p>
                  <p>{article.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
