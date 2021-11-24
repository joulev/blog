import Link from "next/link";

const navlinkStyles = "\
  rounded text-center py-2 no-underline \
  text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700";
const activeStyles = "\
  bg-primary-100 hover:bg-primary-100 dark:bg-primary-900 dark:hover:bg-primary-900 \
  font-bold text-primary-600 dark:text-primary-400";

export default function SidebarNavlink({ active }) {
  return <>
    <div className="flex flex-col gap-2 mb-5">
      <Link href="/"      ><a className={`${navlinkStyles} ${active === 1 ? activeStyles : ""}`}>Home</a></Link>
      <Link href="/about" ><a className={`${navlinkStyles} ${active === 2 ? activeStyles : ""}`}>About me</a></Link>
      <Link href="/search"><a className={`${navlinkStyles} ${active === 3 ? activeStyles : ""}`}>Search</a></Link>
    </div>
  </>;
}
