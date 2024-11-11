const NEWS_API_KEY = "a78455865a3b4e77a44f5ab2458ed238";
const NewsApi = require("newsapi");
import { prisma } from "../modules/prisma";
import { loadEnvConfig } from "@next/env";
const STATES = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE"];
const TOPICS = ["politics", "sports", "entertainment", "technology"];
const projectDir = process.cwd();
loadEnvConfig(projectDir);

type NewsApiResponse = {
  status: string;
  totalResults: number;
  articles: NewsApiArticle[];
};

type NewsApiArticle = {
  source: { id: string; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

(async () => {
  const newsapi = new NewsApi(NEWS_API_KEY);

  const resp: NewsApiResponse = await newsapi.v2.topHeadlines({
    country: "us",
  });

  const articles = resp.articles;

  // delete all
  await prisma.newsArticle.deleteMany({});

  await prisma.newsArticle.createMany({
    data: articles.map((article) => ({
      title: article.title,
      description: article.description,
      imageUrl: article.urlToImage,
      publishedAt: new Date(article.publishedAt),
      state: STATES[Math.floor(Math.random() * STATES.length)],
      topic: TOPICS[Math.floor(Math.random() * TOPICS.length)],
      articleUrl: article.url,
    })),
  });
})();
