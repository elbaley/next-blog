import { transformerCopyButton } from "@rehype-pretty/transformers";
import { readFile } from "fs/promises";
import matter from "gray-matter";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import toml from "toml";
import { unified } from "unified";
import { getAllPosts } from "./getAllPosts";

export const getPost = async (slug: string) => {
  const posts = await getAllPosts();
  const currentIdx = posts.findIndex((post) => post.href === "/" + slug);

  const previousPost = posts[currentIdx + 1] ?? null;
  const nextPost = posts[currentIdx - 1] ?? null;

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
  const postDate = new Date(matterResult.data.date).toLocaleDateString(
    "tr-TR",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );
  const postTitle = matterResult.data.title;

  const githubEditUrl = `https://github.com/elbaley/next-blog/edit/main/src/content/${slug}.mdx`;

  return {
    contentHtml,
    githubEditUrl,
    postDate,
    postTitle,
    nextPost,
    previousPost,
  };
};
