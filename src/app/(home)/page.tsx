import { POSTS } from "./demoPosts";
import { Post } from "./_components/Post";
import { readdir } from "fs/promises";

export default async function Home() {
  const entries = await readdir("./src/content");
  const posts = entries.map((entry) => ({
    title: entry.replace(".mdx", ""),
  }));
  return (
    <>
      {POSTS.map((post) => {
        return <Post post={{ ...post, href: "/" }} key={post.title} />;
      })}
      {posts.map((post) => {
        return (
          <Post
            post={{
              title: post.title,
              excerpt: "Lorem ipsum",
              date: "2021-01-01",
              href: "/" + post.title,
            }}
            key={post.title}
          />
        );
      })}
    </>
  );
}
