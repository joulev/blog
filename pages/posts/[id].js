import moment from "moment";
import Layout from "../../components/layout";
import endArticle from "../../data/endArticle";
import { listPosts, getPostContent } from "../../lib/getPosts";

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
  const buildTime = moment().format("HH:mm:ss D/MM/YY (ZZ)");
  return {
    props: {
      buildTime,
      id: params.id,
      post
    }
  }
}

export default function Post({ dark, changeMode, buildTime, post, id }) {
  return (
    <Layout dark={dark} changeMode={changeMode} buildTime={buildTime}
      title={post.data.title} postPage={true} content={post.content} data={post.data} activeLink={0}>
      {endArticle[id] === null ? null : endArticle[id]}
    </Layout>
  )
}
