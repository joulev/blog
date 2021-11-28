import Markdown from "markdown-to-jsx";
import Layout from "../../components/layout";
import { LinkBtn, PreBlock, ArticleLink, Heading } from "../../components/posts";
import { TagList } from "../../components/tags";
import Date from "../../components/date";
import { listPosts, getPostContent } from "../../lib/getPosts";
import getCommitInfo from "../../lib/getCommitInfo";

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
    <Layout title={post.data.title} activeLink={0} {...{ dark, changeMode, versionInfo }}>
      <h1>{post.data.title}</h1>
      <div className="mt-3 text-xl text-gray-500"><Date time={post.data.time} /></div>
      <div className="mt-2 mb-6"><TagList tags={post.data.tag} /></div>
      <Markdown options={{
        namedCodesToUnicode: { ndash: "–", minus: "−", rarr: "→" },
        overrides: {
          LinkBtn: { component: LinkBtn },
          pre: { component: PreBlock, props: { dark } },
          a: { component: ArticleLink },
          h2: { component: Heading, props: { level: 2 } },
          h3: { component: Heading, props: { level: 3 } },
          h4: { component: Heading, props: { level: 4 } },
          h5: { component: Heading, props: { level: 5 } },
          h6: { component: Heading, props: { level: 6 } },
        }
      }}>
        {post.content}
      </Markdown>
    </Layout>
  </>;
}
