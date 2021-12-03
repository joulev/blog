import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [justCopied, setJustCopied] = useState(false);
  const [copyTimeOut, setCopyTimeOut] = useState(null);
  const copyToClipboard = content => {
    navigator.clipboard.writeText(content);
    setJustCopied(true);
    clearTimeout(copyTimeOut);
    setCopyTimeOut(setTimeout(() => setJustCopied(false), 1000));
  }
  const copyBtnClass = `
    absolute top-2 right-2 z-30 p-2 cursor-pointer transition opacity-0 group-hover:opacity-100 bg-gray-200 dark:bg-gray-800
    border border-solid rounded border-gray-400 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-500 `;
  let lang = "text"; // default monospaced text
  if (className && className.startsWith("lang-")) lang = className.replace("lang-", "");
  return <>
    <div className="relative group">
      {justCopied
      ? <div className={copyBtnClass + "text-green-550 dark:text-green-450 hover:text-green-550 dark:hover:text-green-450"}
          onClick={() => copyToClipboard(children)}>
          <svg width="18" height="18">
            <path d="M1 12 L6 17 L17 1" className="stroke-current stroke-2 cap-round fill-none" />
          </svg>
        </div>
      : <div className={copyBtnClass + "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"}
          onClick={() => copyToClipboard(children)} title="Copy">
          <svg width="18" height="18">
            <rect x="2" y="5" width="10" height="12" rx="2" ry="2"
              className="stroke-current stroke-2 cap-round fill-none" />
            <rect x="6" y="1" width="10" height="12" rx="2" ry="2"
              className="stroke-current stroke-2 cap-round fill-gray-200 dark:fill-gray-800" />
          </svg>
        </div>
      }
      <SyntaxHighlighter language={lang} style={dark ? monokaiDark : monokaiLight}>
        {children}
      </SyntaxHighlighter>
    </div>
  </>;
}

export function PreBlock({ children, dark, ...rest }) {
  if ("type" in children && children ["type"] === "code") return CodeBlock({ dark, ...children.props });
  return <pre {...rest}>{children}</pre>;
};

