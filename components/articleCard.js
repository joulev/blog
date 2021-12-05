import Link from "next/link";
import { truncatePlainContent } from "../lib/utils";
import Date from "./date";
import { TagList } from "./tags";

export default function ArticleCard({ post, tagCount, bottom, children }) {
  return <>
    <div className="
      rounded border border-solid p-4 mb-5
      border-gray-400 dark:border-gray-600
    ">
      <div className="text-xl font-bold">
        <Link href={`/posts/${post.name}`}><a>{post.title}</a></Link>
      </div>
      <div className="text-md text-gray-500"><Date time={post.time} /></div>
      <div className="my-4">{children ? children : truncatePlainContent(post.plain)}</div>
      <TagList tags={post.tag} {...{ tagCount, bottom }} />
    </div>
  </>;
}
