import { readdir, readFile } from "fs/promises";
import { ExternalLink } from "lucide-react";
import matter from "gray-matter";
import toml from "toml";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import rehypePrettyCode from "rehype-pretty-code";
import remarkRehype from "remark-rehype";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import { unified } from "unified";
import Link from "next/link";

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
  const githubEditUrl = `https://github.com/elbaley/next-blog/edit/main/src/content/${slug}.mdx`;

  return (
    <article className="prose max-w-[80ch] dark:prose-invert prose-inline-code:border prose-inline-code:before:hidden prose-inline-code:after:hidden prose-inline-code:p-1 prose-inline-code:border-secondary/40 prose-inline-code:rounded-md prose-inline-code:bg-secondary/20 prose-pre:ps-0 prose-pre:pe-0 prose-pre:p-0 prose-pre:py-2">
      <h1>{matterResult.data.title}</h1>
      <span className="text-secondary ">{date}</span>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      <Link
        href={githubEditUrl}
        className="flex justify-end pt-4 gap-1 items-center text-accent hover:text-foreground "
      >
        <svg
          className="h-6 fill-white mr-1"
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>GitHub</title>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
        Bu sayfayı düzenle
        <ExternalLink size={16} />
      </Link>
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
