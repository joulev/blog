import ArticleCard from "../components/articleCard";
import Layout from "../components/layout";
import getCommitInfo from "../lib/getCommitInfo";
import { listPosts } from "../lib/getPosts";
import { getTagCount } from "../lib/getTags";

export function getStaticProps() {
  const posts = listPosts();
  const tagCount = getTagCount();
  const versionInfo = getCommitInfo();
  return { props: { posts, tagCount, versionInfo } }
}

export default function Home({ dark, changeMode, posts, tagCount, versionInfo }) {
  return <>
    <Layout title="Home" sideLink={1} {...{ dark, changeMode, versionInfo }}>
      <h1>Posts</h1>
      {posts.map((post, idx) => <ArticleCard {...{ post, tagCount }} bottom={idx === posts.length - 1} key={post.name} />)}
    </Layout>
  </>;
}
