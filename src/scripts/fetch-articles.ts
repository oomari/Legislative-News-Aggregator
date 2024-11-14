import { loadEnvConfig } from "@next/env";
import { fetchArticles } from "./functions/fetch-articles";
const projectDir = process.cwd();
loadEnvConfig(projectDir);

fetchArticles();
