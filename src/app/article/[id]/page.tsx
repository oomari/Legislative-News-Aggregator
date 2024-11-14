"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Article } from "@/app/page";

function Page() {
  const [article, setArticle] = useState<Article | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const resp = await fetch(`/api/news/${id}`);
        const json = await resp.json();
        const _article: Article = json;
        setArticle(_article);
      } catch (error) {
        console.error("Failed to fetch article:", error);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div data-name="container" className="flex flex-col items-center">
      <div
        data-name="article-content"
        className="border-2 border-white rounded-md max-w-4xl"
      >
        <div className="relative aspect-video">
          {article && <Image src={article.imageUrl} alt="article image" fill />}
        </div>
        <div className="flex flex-col gap-y-2 text-white text-sm p-4">
          <h1 className="max-w-lg">{article?.title}</h1>
          <time>{new Date(article?.publishedAt).toLocaleString()}</time>
          <h3>{article?.state}</h3>
          <p>{article?.topic}</p>
          <p className="max-w-xl">{article?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
