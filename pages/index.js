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
    <Layout title="Home" sideLink={1} {...{ dark, changeMode, versionInfo }}>
      <h1>Posts</h1>
      {posts.map(post => <ArticleCard post={post} key={post.name} />)}
    </Layout>
  </>;
}
