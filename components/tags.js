import Link from "next/link";
import tagDescriptions from "../data/tagDescriptions";

function TagLink({ tag, big }) {
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

export default function Tag({ tag, count, big }) {
  if (big) {
    return <>
      <div className="mb-6">
        <TagLink {...{ tag, big }} />
      </div>
    </>;
  }
  return <>
    <div className="group relative">
      <TagLink {...{ tag, big }} />
      <div className="hidden md:block
        invisible opacity-0 group-hover:visible group-hover:opacity-100 z-40 transition delay-500
        absolute top-full left-1/2 -translate-x-1/2 mt-2 p-4 w-72
        rounded border border-solid border-gray-400 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 shadow-lg
      ">
        <TagLink {...{ tag, big }} /><span className="text-sm text-gray-500 ml-1">&times;{count}</span>
        <div className={`mt-3 text-sm ${!tagDescriptions[tag] && "text-gray-500"}`}>
          {tagDescriptions[tag] || "(no description)"}<br />
        </div>
      </div>
    </div>
  </>;
}

export function TagList({ tags, tagCount }) {
  return <>
    <div className="flex gap-2">
      {tags.split(" ").map(tag => <Tag tag={tag} count={tagCount[tag]} key={tag} />)}
    </div>
  </>;
}
