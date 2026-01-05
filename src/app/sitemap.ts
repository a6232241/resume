import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://resume-eight.vercel.app";

  const locales = ["en", "zh"];
  const projectPaths = [
    "",
    "/project-demo/10x-app-speed",
    "/project-demo/ai-chat-app",
    "/project-demo/berify",
    "/project-demo/music-player",
    "/project-demo/visual-streaming",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((lang) => {
    projectPaths.forEach((path) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: path === "" ? 1.0 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
