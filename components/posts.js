import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { monokaiDark, monokaiLight } from "../lib/monokai";
import css from "./posts.heading.module.css";

function HeadingElement({ level, children }) {
  // would love to know a more elegant way...
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      return <span>{children}</span>;
  }
}

export function Heading({ level, children }) {
  const idText = children[0].toLowerCase().replace(/[^\w]+/g, "-");
  return <>
    <div className={`relative pt-10 group ${css.headingContainer}`} id={idText}>
      <div className="
        invisible absolute -left-8 bottom-0 pl-2 w-10 text-xl opacity-0 transition-opacity
        hover:visible hover:opacity-100 group-hover:visible group-hover:opacity-100
      ">
        <a href={`#${idText}`} className="no-underline text-gray-500 hover:text-gray-400 dark:hover:text-gray-600"
          onClick={() => document.querySelector(`#${idText}`).scrollIntoView({ behavior: "smooth" })}>
          #
        </a>
      </div>
      <HeadingElement level={level}>{children[0]}</HeadingElement>
    </div>
  </>;
}

export function LinkBtn({ href, text }) {
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

export function ArticleLink({ href, title, children }) {
  if (href[0] === "/") return <Link href={href}><a>{children}</a></Link>;
  return <a href={href} target="_blank" rel="noreferrer">{children}</a>;
}

// Based on https://stackoverflow.com/a/68179028/12419999
function CodeBlock({ className, children, dark }) {
  let lang = "text"; // default monospaced text
  if (className && className.startsWith("lang-")) lang = className.replace("lang-", "");
  return <>
    <SyntaxHighlighter language={lang} style={dark ? monokaiDark : monokaiLight}>
      {children}
    </SyntaxHighlighter>
  </>;
}

export function PreBlock({ children, dark, ...rest }) {
  if ("type" in children && children ["type"] === "code") return CodeBlock({ dark, ...children.props });
  return <pre {...rest}>{children}</pre>;
};

