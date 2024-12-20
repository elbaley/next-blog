import { readdir, readFile, writeFile } from "fs/promises";
import matter from "gray-matter";
import toml from "toml";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getSitemap() {
  const contentDir = path.join(__dirname, "../src/content");
  const entries = await readdir(contentDir);
  const posts = (
    await Promise.all(
      entries
        .filter((entry) => entry.endsWith(".mdx"))
        .map(async (entry) => {
          const fileContents = await readFile(
            path.join(contentDir, entry),
            "utf8",
          );
          const matterResult = matter(fileContents, {
            delimiters: "+++",
            engines: { toml: toml.parse.bind(toml) },
            language: "toml",
          });
          const { date } = matterResult.data;
          return {
            date: date ? new Date(date) : new Date(),
            href: "https://furkanleba.com/" + entry.replace(".mdx", ""),
          };
        }),
    )
  )
    .filter((post) => post.date)
    .sort((a, b) => b.date - a.date);

  const pages = [
    {
      href: "https://furkanleba.com/hakkimda",
      date: new Date(),
    },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
</urlset>`;
}

(async () => {
  const sitemap = await getSitemap();
  const outDir = path.join(__dirname, "../out");
  await writeFile(path.join(outDir, "sitemap.xml"), sitemap, "utf8");
  console.log("✅ Sitemap generated successfully!");
})();
