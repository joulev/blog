import Layout from "../../components/layout";
import { listPosts, getPostContent } from "../../lib/getPosts";

export async function getStaticPaths() {
  const posts = listPosts();
  const routerArr = posts.map(post => {
    const time = post.time;
    const timeArr = time.split("/");
    return {
      params: {
        id: [timeArr[2], timeArr[1], timeArr[0], post.name],
      }
    }
  });
  return {
    paths: routerArr,
    fallback: false
  }
}

export function getStaticProps({ params }) {
  const post = getPostContent(params.id[3]);
  return {
    props: {
      post
    }
  }
}

export default function Post({post}) {
  return (
    <Layout title={post.data.title} postPage={true} content={post.content} data={post.data} />
  )
}
