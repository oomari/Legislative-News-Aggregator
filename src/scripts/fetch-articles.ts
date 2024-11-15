import { loadEnvConfig } from "@next/env";
import { fetchArticles } from "./functions/fetch-articles";

// Get the current working directory of the project
const projectDir = process.cwd();
// Load environment variables from the .env file in the project directory
loadEnvConfig(projectDir);
// Call the fetchArticles function to fetch articles
fetchArticles();
