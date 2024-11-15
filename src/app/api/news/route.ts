import { prisma } from "@/modules/prisma";
import { NewsArticle, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

// Define the Response type
export type Response = {
  data: NewsArticle[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
  };
};

// GET /api/news
export async function GET(request: NextRequest) {
  // Extract search parameters from the request URL
  const searchParams = request.nextUrl.searchParams;
  // console.log(searchParams);

  // Extract individual search parameters
  const state = searchParams.get("state");
  const topic = searchParams.get("topic");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "12");

  // Initialize filters object for Prisma query
  const filters: Prisma.NewsArticleFindManyArgs["where"] = {};

  // Add state filter if provided
  if (state) {
    filters.state = { equals: state };
  }
  // Add topic filter if provided
  if (topic) {
    filters.topic = { equals: topic };
  }
  // Add search filter if provided
  if (search) {
    filters.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ];
  }

  // Calculate skip and take values for pagination
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  // Fetch news articles from the database with filters and pagination
  const newsArticles = await prisma.newsArticle.findMany({
    where: filters,
    skip,
    take,
  });

  // Count the total number of articles that match the filters
  const totalArticles = await prisma.newsArticle.count({
    where: filters,
  });

  // Return the response with the fetched articles and pagination metadata
  return Response.json({
    data: newsArticles,
    meta: {
      total: totalArticles,
      page,
      pageSize,
    },
  });
}
