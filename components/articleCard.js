import Link from "next/link";
import Date from "../components/date";
import TagList from "../components/tagList";
import { truncatePlainContent } from "../lib/utils";

export default function ArticleCard({ dark, name, title, time, plain, tag }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <Link href={`/posts/${name}`}>
          <a className="h4 card-title">{title}</a>
        </Link>
        <div className="card-subtitle mt-1 mb-3 text-muted">
          <Date time={time} />
        </div>
        <p className="card-text">{truncatePlainContent(plain)}</p>
        <TagList dark={dark} tags={tag} />
      </div>
    </div>
  );
}
