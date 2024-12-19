import matter from "gray-matter";
import toml from "toml";
import { Post, type PostInfo } from "./_components/Post";
import { readdir, readFile } from "fs/promises";

export default async function Home() {
  const entries = await readdir("./src/content");
  const posts: PostInfo[] = await Promise.all(
    entries.map(async (entry) => {
      const fileContents = await readFile(`./src/content/${entry}`, "utf8");
      const matterResult = matter(fileContents, {
        delimiters: "+++",
        engines: {
          toml: toml.parse.bind(toml),
        },
        language: "toml",
        excerpt_separator: "<!-- end -->",
      });

      const contentExcerpt = matterResult.content.slice(0, 139) + "...";
      const delimiterExcerpt = matterResult.excerpt;
      const showDelimiterExcerpt =
        delimiterExcerpt && delimiterExcerpt?.length > 3;

      return {
        title: matterResult.data.title ?? "",
        excerpt: showDelimiterExcerpt ? delimiterExcerpt : contentExcerpt,

        date: matterResult.data.date
          ? new Date(matterResult.data.date).toLocaleDateString("tr", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "",
        href: "/" + entry.replace(".mdx", ""),
      };
    }),
  );

  return (
    <>
      {posts.map((post) => (
        <Post post={post} key={post.href} />
      ))}
    </>
  );
}
