import { prisma } from "@/modules/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const state = searchParams.get("state");
  const topic = searchParams.get("topic");
  const search = searchParams.get("search");
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

  const newsArticles = await prisma.newsArticle.findMany({
    where: filters,
  });

  return Response.json(newsArticles);
}
