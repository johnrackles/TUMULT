import { type MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.tumult.club",
      lastModified: new Date(),
    },
    {
      url: "https://www.tumult.club/en",
      lastModified: new Date(),
    },
    {
      url: "https://www.tumult.club/about-us",
      lastModified: new Date(),
    },
    {
      url: "https://www.tumult.club/impressum",
      lastModified: new Date(),
    },
    {
      url: "https://www.tumult.club/en/about-us",
      lastModified: new Date(),
    },
    {
      url: "https://www.tumult.club/en/impressum",
      lastModified: new Date(),
    },
  ];
}
