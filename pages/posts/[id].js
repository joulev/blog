import Layout from "../../components/layout";
import TagList from "../../components/tags/tagList";
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
    <Layout dark={dark} changeMode={changeMode} versionInfo={versionInfo}
      title={post.data.title} activeLink={0}>
      <h1>{post.data.title}</h1>
      <div className="mt-3 text-xl text-gray-500"><Date time={post.data.time} /></div>
      <div className="mt-2"><TagList tags={post.data.tag} /></div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </Layout>
  </>;
}
