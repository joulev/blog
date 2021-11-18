import Layout from "../../components/layout";
import endArticle from "../../data/endArticle";
import { listPosts, getPostContent } from "../../lib/getPosts";
import getCommitInfo from "../../lib/getCommitInfo";

export async function getStaticPaths() {
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
      id: params.id,
      post
    }
  }
}

export default function Post({ dark, changeMode, versionInfo, post, id }) {
  return (
    <Layout dark={dark} changeMode={changeMode} versionInfo={versionInfo}
      title={post.data.title} postPage={true} content={post.content} data={post.data} activeLink={0}>
      {endArticle[id] === null ? null : endArticle[id]}
    </Layout>
  )
}
