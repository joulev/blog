import Link from "next/link";

export default function ArticleLink({ href, title, children }) {
  if (href[0] === "/") return <Link href={href}><a>{children}</a></Link>;
  return <a href={href} target="_blank" rel="noreferrer">{children}</a>;
}
