import ArticleCard from "../components/articleCard";
import Layout from "../components/layout";
import getCommitInfo from "../lib/getCommitInfo";
import { listPosts } from "../lib/getPosts";

export function getStaticProps() {
  const posts = listPosts();
  const versionInfo = getCommitInfo();
  return { props: { posts, versionInfo } }
}

export default function Home({ dark, changeMode, posts, versionInfo }) {
  return <>
    <Layout dark={dark} changeMode={changeMode} versionInfo={versionInfo}
      title="Home" sideLink={1}>
      <h1>Posts</h1>
      {posts.map(post => <ArticleCard post={post} key={post.name} />)}
    </Layout>
  </>;
}
