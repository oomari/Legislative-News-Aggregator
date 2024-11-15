import { fetchArticles } from "@/scripts/functions/fetch-articles";

// GET /api/news/import
export async function GET(request: Request) {
  await fetchArticles();
  return new Response("OK", { status: 200 });
}
