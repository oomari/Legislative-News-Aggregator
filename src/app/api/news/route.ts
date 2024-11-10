import { prisma } from "@/modules/prisma";
export async function GET(request: Request) {
  const newsArticles = await prisma.newsArticle.findMany();
  return Response.json(newsArticles);
}
