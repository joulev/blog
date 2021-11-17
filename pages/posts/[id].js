import Layout from "../../components/layout";
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
  return {
    props: {
      post
    }
  }
}

export default function Post({ dark, changeMode, post }) {
  return (
    <Layout dark={dark} changeMode={changeMode} title={post.data.title} postPage={true}
      content={post.content} data={post.data} activeLink={0} />
  )
}
