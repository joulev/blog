import Layout from "../components/layout";
import ArticleCard from "../components/articleCard";
import { listPosts } from "../lib/getPosts";
import getCommitInfo from "../lib/getCommitInfo";

export function getStaticProps() {
  const posts = listPosts();
  const versionInfo = getCommitInfo();
  return { props: { posts, versionInfo } }
}

export default function Home({ dark, changeMode, versionInfo, posts }) {
  return (
    <Layout dark={dark} changeMode={changeMode} versionInfo={versionInfo}
      title="Home" postPage={false} data={{}} activeLink={1}>
      <h1>Posts</h1>
      {posts.map(post => (
        <ArticleCard dark={dark} key={post.name} name={post.name} title={post.title}
          time={post.time} plain={post.plain} tag={post.tag} />
      ))}
    </Layout>
  )
}
