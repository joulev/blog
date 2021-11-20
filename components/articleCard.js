import Link from "next/link";
import Date from "../components/date";
import TagList from "../components/tagList";
import { truncatePlainContent } from "../lib/utils";

export default function ArticleCard({ dark, name, title, time, plain, tag }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <Link href={`/posts/${name}`}>
          <a className="h5 card-title">{title}</a>
        </Link>
        <h6 className="small card-subtitle mt-1 mb-3 text-muted">
          <Date time={time} />
        </h6>
        <p className="card-text">{truncatePlainContent(plain)}</p>
        <TagList dark={dark} tags={tag} />
      </div>
    </div>
  );
}
