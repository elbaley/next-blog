import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import toml from "toml";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import rehypePrettyCode from "rehype-pretty-code";
import remarkRehype from "remark-rehype";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import { unified } from "unified";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const fileContents = await readFile("./src/content/" + slug + ".mdx", "utf8");

  const matterResult = matter(fileContents, {
    delimiters: "+++",
    engines: {
      toml: toml.parse.bind(toml),
    },
    language: "toml",
  });
  // Use remark to convert markdown into HTML string
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypePrettyCode, {
      theme: "tokyo-night",
      transformers: [
        transformerCopyButton({
          visibility: "hover",
          feedbackDuration: 1_000,
        }),
      ],
    })

    .use(rehypeStringify)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();
  const date = new Date(matterResult.data.date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="prose max-w-[80ch] dark:prose-invert prose-inline-code:border prose-inline-code:before:hidden prose-inline-code:after:hidden prose-inline-code:p-1 prose-inline-code:border-secondary/40 prose-inline-code:rounded-md prose-inline-code:bg-secondary/20 prose-pre:ps-0 prose-pre:pe-0 prose-pre:p-0 prose-pre:py-2">
      <h1>{matterResult.data.title}</h1>
      <span className="text-secondary ">{date}</span>
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
