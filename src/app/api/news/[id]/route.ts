import { prisma } from "@/modules/prisma";

// GET /api/news/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // pull news id from params
  const { id } = params;
  // using the id, fetch article from database with corresponding id
  const newsArticle = await prisma.newsArticle.findFirst({
    where: { id: parseInt(id) },
  });
  return Response.json(newsArticle);
}
