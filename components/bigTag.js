import Link from "next/link";

export default function BigTag({ tag }) {
  return <>
    <div className="mb-6">
      <Link href={`/tags/${tag}`}>
        <a className="
          text-4xl rounded px-3 py-1 no-underline
          bg-primary-100 text-primary-600
          hover:bg-primary-600 hover:text-gray-100
          dark:bg-primary-900 dark:text-primary-400
          dark:hover:bg-primary-400 dark:hover:text-gray-100
        ">{tag}</a>
      </Link>
    </div>
  </>;
}
