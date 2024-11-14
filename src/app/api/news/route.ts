import { prisma } from "@/modules/prisma";
import { NewsArticle, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

export type Response = {
  data: NewsArticle[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
  };
};

export async function GET(request: NextRequest) {
  //website.com
  const searchParams = request.nextUrl.searchParams;
  console.log(searchParams);

  const state = searchParams.get("state");

  const topic = searchParams.get("topic");
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "8");

  const filters: Prisma.NewsArticleFindManyArgs["where"] = {};

  if (state) {
    filters.state = { equals: state };
  }

  if (topic) {
    filters.topic = { equals: topic };
  }

  if (search) {
    filters.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const newsArticles = await prisma.newsArticle.findMany({
    where: filters,
    skip,
    take,
  });

  const totalArticles = await prisma.newsArticle.count({
    where: filters,
  });

  return Response.json({
    data: newsArticles,
    meta: {
      total: totalArticles,
      page,
      pageSize,
    },
  });
}
