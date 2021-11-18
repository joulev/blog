import Layout from "../../components/layout";
import endArticle from "../../data/endArticle";
import { listPosts, getPostContent } from "../../lib/getPosts";
import { getBuildInfo } from "../../lib/utils";

export async function getStaticPaths() {
  const posts = listPosts();
  const routerArr = posts.map(post => {
    return {
      params: {
        id: post.name,
      }
    }
  });
  return {
    paths: routerArr,
    fallback: false
  }
}

export function getStaticProps({ params }) {
  const post = getPostContent(params.id);
  const buildInfo = getBuildInfo();
  return {
    props: {
      buildInfo,
      id: params.id,
      post
    }
  }
}

export default function Post({ dark, changeMode, buildInfo, post, id }) {
  return (
    <Layout dark={dark} changeMode={changeMode} buildInfo={buildInfo}
      title={post.data.title} postPage={true} content={post.content} data={post.data} activeLink={0}>
      {endArticle[id] === null ? null : endArticle[id]}
    </Layout>
  )
}
