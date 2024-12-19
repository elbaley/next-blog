import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import toml from "toml";
import { remark } from "remark";
import html from "remark-html";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const { default: Post } = await import(`@/content/${slug}.mdx`);
  const fileContents = await readFile("./src/content/" + slug + ".mdx", "utf8");

  const matterResult = matter(fileContents, {
    delimiters: "+++",
    engines: {
      toml: toml.parse.bind(toml),
    },
    language: "toml",
  });
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return (
    <article className="prose dark:prose-invert prose-inline-code:border prose-inline-code:before:hidden prose-inline-code:after:hidden prose-inline-code:p-1 prose-inline-code:border-secondary/40 prose-inline-code:rounded-md prose-inline-code:bg-secondary/20 prose-inline-code:font-">
      <h1>{matterResult.data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}

export async function generateStaticParams() {
  const entries = await readdir("./src/content");
  const posts = entries.map((entry) => ({
    slug: entry.replace(".mdx", ""),
  }));
  return posts;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const slug = (await params).slug;
  const file = await readFile("./src/content/" + slug + ".mdx", "utf8");
  const { data } = matter(file, {
    delimiters: "+++",
    engines: {
      toml: toml.parse.bind(toml),
    },
    language: "toml",
  });
  return {
    title: data.title + " - Furkan Leba",
    description: data.description,
  };
}
