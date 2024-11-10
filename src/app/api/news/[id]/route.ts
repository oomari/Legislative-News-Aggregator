import { prisma } from "@/modules/prisma";
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const newsArticle = await prisma.newsArticle.findFirst({
    where: { id: parseInt(id) },
  });
  return Response.json(newsArticle);
}
