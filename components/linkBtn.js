import Link from "next/link";

export default function LinkBtn({ href, text }) {
  return <>
    <Link href={href}>
      <a className="
        inline-block px-3 py-1.5 mb-5 rounded no-underline
        bg-primary-400 hover:bg-primary-500
        dark:bg-primary-600 dark:hover:bg-primary-700
        text-gray-100
      ">{text}</a>
    </Link>
  </>;
}
