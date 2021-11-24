import { truncatePlainContent } from "../lib/utils";
import Date from "./date";
import TagList from "./tags/tagList";

export default function ArticleCard({ post }) {
  return <>
    <div className="
      rounded border border-solid p-4 mb-5
      border-gray-400 dark:border-gray-600
    ">
      <div className="text-xl font-bold"><a href={`/posts/${post.name}`}>{post.title}</a></div>
      <div className="text-md text-gray-500"><Date time={post.time} /></div>
      <div className="my-4">{truncatePlainContent(post.plain)}</div>
      <TagList tags={post.tag} />
    </div>
  </>;
}
