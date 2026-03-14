import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.appguiding.com";
  const currentDate = new Date().toISOString();

  // All tool routes
  const tools = [
    "bmi-calculator",
    "youtube-title-generator",
    "json-formatter",
    "random-number-generator",
    "color-palette-generator",
    "image-to-base64",
    "pdf-converter",
    "image-converter",
    "unit-converter",
    "qr-code-generator",
    "word-counter",
    "base64-converter",
    "youtube-downloader",
    "text-to-hashtags",
    "markdown-previewer",
    "lorem-ipsum-generator",
    "text-case-converter",
    "slug-generator",
    "uuid-generator",
    "timestamp-converter",
    "regex-tester",
    "code-minifier",
  ];

  const toolRoutes = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...toolRoutes,
  ];
}
