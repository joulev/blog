import Markdown from "markdown-to-jsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { monokaiDark, monokaiLight } from "../../lib/monokai";
import LinkBtn from "../../components/linkBtn";
import Layout from "../../components/layout";
import TagList from "../../components/tags/tagList";
import Date from "../../components/date";
import { listPosts, getPostContent } from "../../lib/getPosts";
import getCommitInfo from "../../lib/getCommitInfo";

// Based on https://stackoverflow.com/a/68179028/12419999
function CodeBlock({ className, children, dark }) {
  let lang = "text"; // default monospaced text
  if (className && className.startsWith("lang-")) lang = className.replace("lang-", "");
  return <SyntaxHighlighter language={lang} style={dark ? monokaiDark : monokaiLight} children={children} />;
}

function PreBlock({ children, dark, ...rest }) {
  if ("type" in children && children ["type"] === "code") return CodeBlock({ dark, ...children.props });
  return <pre {...rest}>{children}</pre>;
};

export function getStaticPaths() {
  const posts = listPosts();
  const routerArr = posts.map(post => {
    return { params: { id: post.name, } }
  });
  return { paths: routerArr, fallback: false }
}

export function getStaticProps({ params }) {
  const post = getPostContent(params.id);
  const versionInfo = getCommitInfo();
  return {
    props: {
      versionInfo,
      post
    }
  }
}

export default function Post({ dark, changeMode, versionInfo, post }) {
  return <>
    <Layout dark={dark} changeMode={changeMode} versionInfo={versionInfo}
      title={post.data.title} activeLink={0}>
      <h1>{post.data.title}</h1>
      <div className="mt-3 text-xl text-gray-500"><Date time={post.data.time} /></div>
      <div className="mt-2"><TagList tags={post.data.tag} /></div>
      <Markdown children={post.content} options={{
        namedCodesToUnicode: { ndash: "–" },
        overrides: {
          LinkBtn: { component: LinkBtn },
          pre: {
            component: PreBlock,
            props: { dark }
          }
        }
      }} />
    </Layout>
  </>;
}
