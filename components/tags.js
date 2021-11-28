import Link from "next/link";

function TagSkeleton({ tag, big }) {
  return <>
    <Link href={`/tags/${tag}`}>
      <a className={`
        rounded no-underline
        ${big ? "text-4xl px-3 py-1" : "px-1.5 py-0.5"}
        bg-primary-100 text-primary-600
        hover:bg-primary-600 hover:text-gray-100
        dark:bg-primary-900 dark:text-primary-400
        dark:hover:bg-primary-400 dark:hover:text-gray-100
      `}>{tag}</a>
    </Link>
  </>;
}

export default function Tag({ tag, big }) {
  if (big) {
    return <>
      <div className="mb-6">
        <TagSkeleton {...{ tag, big }} />
      </div>
    </>;
  }
  return <TagSkeleton {...{ tag, big }} />;
}

export function TagList({ tags }) {
  return <>
    <div className="flex gap-2">
      {tags.split(" ").map(tag => <Tag tag={tag} key={tag} />)}
    </div>
  </>;
}
