import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { monokaiDark, monokaiLight } from "../../lib/monokai";

// Based on https://stackoverflow.com/a/68179028/12419999
function CodeBlock({ className, children, dark }) {
  let lang = "text"; // default monospaced text
  if (className && className.startsWith("lang-")) lang = className.replace("lang-", "");
  return <SyntaxHighlighter language={lang} style={dark ? monokaiDark : monokaiLight} children={children} />;
}

export default function PreBlock({ children, dark, ...rest }) {
  if ("type" in children && children ["type"] === "code") return CodeBlock({ dark, ...children.props });
  return <pre {...rest}>{children}</pre>;
};
