import { ChevronRight } from "lucide-react";
import Link from "next/link";

type PostProps = {
  post: {
    title: string;
    excerpt: string;
    date: string;
    href: string;
  };
};
export const Post = ({ post }: PostProps) => {
  return (
    <article className="pb-4 border-b last:border-none first:pt-0 pt-8">
      <Link href={post.href} className="hover:underline">
        <h2 className="text-4xl pb-5">{post.title}</h2>
      </Link>
      <span className="text-secondary ">{post.date}</span>
      <p className="pt-4 text-lg">{post.excerpt}</p>
      <Link
        href={post.href}
        className="flex pt-4 gap-1 items-center text-accent hover:text-foreground "
      >
        Devamını oku <ChevronRight size={16} />
      </Link>
    </article>
  );
};
