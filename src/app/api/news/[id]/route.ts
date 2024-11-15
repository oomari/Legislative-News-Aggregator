import { prisma } from "@/modules/prisma";

// GET /api/news/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Pull news id from params
  const { id } = params;
  // Using the id, fetch article from database with corresponding id
  const newsArticle = await prisma.newsArticle.findFirst({
    where: { id: parseInt(id) },
  });
  // Return article as JSON response
  return Response.json(newsArticle);
}
