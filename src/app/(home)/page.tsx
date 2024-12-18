import { POSTS } from "./demoPosts";
import { Post } from "./_components/Post";

export default function Home() {
  return (
    <>
      {POSTS.map((post) => {
        return <Post post={post} key={post.title} />;
      })}
    </>
  );
}
