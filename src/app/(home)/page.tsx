import { Post } from "./_components/Post";
import { getAllPosts } from "@/lib/getAllPosts";

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <div className="max-w-[80ch]">
      {posts.map((post) => (
        <Post post={post} key={post.href} />
      ))}
    </div>
  );
}
