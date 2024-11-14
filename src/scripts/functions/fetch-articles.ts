const NEWS_API_KEY = "a78455865a3b4e77a44f5ab2458ed238";
const NewsApi = require("newsapi");
import { states, topics } from "@/app/constants";
import { prisma } from "../../modules/prisma";

export type NewsApiResponse = {
  status: string;
  totalResults: number;
  articles: NewsApiArticle[];
};

export type NewsApiArticle = {
  source: { id: string; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export async function fetchArticles() {
  const resp = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
  );

  const respJson: NewsApiResponse = await resp.json();

  const articles = respJson.articles;

  // delete all
  await prisma.newsArticle.deleteMany({});

  await prisma.newsArticle.createMany({
    data: articles.map((article) => ({
      title: article.title,
      description: article.description,
      imageUrl: article.urlToImage ?? "",
      publishedAt: new Date(article.publishedAt),
      state: states[Math.floor(Math.random() * states.length)].abbreviation,
      topic: topics[Math.floor(Math.random() * topics.length)].name,
      articleUrl: article.url,
    })),
  });
}
