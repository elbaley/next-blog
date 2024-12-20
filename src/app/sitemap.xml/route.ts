import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import toml from "toml";
export const dynamic = "force-static";
export const revalidate = 0;

async function getSitemap() {
  const entries = await readdir("./src/content");
  const posts = (
    await Promise.all(
      entries
        .filter((entry) => entry.endsWith(".mdx"))
        .map(async (entry) => {
          const fileContents = await readFile(`./src/content/${entry}`, "utf8");
          const matterResult = matter(fileContents, {
            delimiters: "+++",
            engines: { toml: toml.parse.bind(toml) },
            language: "toml",
          });
          const { date } = matterResult.data;
          return {
            date: date ? new Date(date) : new Date(),
            href: "https://furkanleba.com/" + entry.replace(".mdx", ""),
            dateTime: new Date(date).getTime(),
          };
        }),
    )
  )
    .filter((post) => post.date)
    .sort((a, b) => b.dateTime - a.dateTime);

  const pages = [
    {
      href: "https://furkanleba.com/hakkimda",
      date: new Date(),
      changeFrequency: "daily",
    },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${[...pages, ...posts]
      .map(
        (item) => `
            <url>
              <loc>${item.href}</loc>
              <lastmod>${item.date.toISOString()}</lastmod>
            </url>
          `,
      )
      .join("")}
    </urlset>
  `;
}

export async function GET() {
  return new Response(await getSitemap(), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
