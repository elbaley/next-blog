import matter from "gray-matter";
import toml from "toml";
import { Post, type PostInfo } from "./_components/Post";
import { readdir, readFile } from "fs/promises";

export default async function Home() {
  const entries = await readdir("./src/content");

  const posts: PostInfo[] = (
    await Promise.all(
      entries
        .filter((entry) => entry.endsWith(".mdx"))
        .map(async (entry) => {
          const fileContents = await readFile(`./src/content/${entry}`, "utf8");
          const matterResult = matter(fileContents, {
            delimiters: "+++",
            engines: { toml: toml.parse.bind(toml) },
            language: "toml",
            excerpt_separator: "<!-- end -->",
          });

          const { title, date, description, draft } = matterResult.data;

          return {
            title: title || "",
            draft: draft,
            excerpt:
              matterResult.excerpt ||
              description ||
              matterResult.content.slice(0, 139) + "...",
            date: date
              ? new Date(date).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "",
            href: "/" + entry.replace(".mdx", ""),
            dateTime: new Date(date).getTime(),
          };
        }),
    )
  )
    .filter((post) => post.date && !post.draft)
    .sort((a, b) => b.dateTime - a.dateTime);

  return (
    <div className="max-w-[80ch]">
      {posts.map((post) => (
        <Post post={post} key={post.href} />
      ))}
    </div>
  );
}
