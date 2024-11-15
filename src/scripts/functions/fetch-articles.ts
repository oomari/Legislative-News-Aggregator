const NEWS_API_KEY = "a78455865a3b4e77a44f5ab2458ed238";
import { states, topics } from "@/app/constants";
import { prisma } from "../../modules/prisma";

// Define the type for the News API response
export type NewsApiResponse = {
  status: string;
  totalResults: number;
  articles: NewsApiArticle[];
};

// Define the type for a News API article
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

// Function to fetch articles from the News API and store them in the database
export async function fetchArticles() {
  // Fetch articles from the News API
  const resp = await fetch(
    `https://newsapi.org/v2/everything?sources=bbc-news,the-verge&apiKey=${NEWS_API_KEY}`
  );

  // Parse the JSON response
  const respJson: NewsApiResponse = await resp.json();

  // Extract articles from the response
  const articles = respJson.articles;

  // Delete all existing articles in the database
  await prisma.newsArticle.deleteMany({});

  // Create new articles in the database
  await prisma.newsArticle.createMany({
    data: articles.map((article) => ({
      title: article.title,
      description: article.description,
      imageUrl: article.urlToImage ?? "",
      publishedAt: new Date(article.publishedAt),
      // Random state abbreviation
      state: states[Math.floor(Math.random() * states.length)].abbreviation,
      // Random topic name
      topic: topics[Math.floor(Math.random() * topics.length)].name,
      articleUrl: article.url,
    })),
  });
}
