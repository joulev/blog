import Layout from "../components/layout";
import ArticleCard from "../components/articleCard";
import { listPosts } from "../lib/getPosts";
import { getBuildInfo } from "../lib/utils";

export function getStaticProps() {
  const posts = listPosts();
  const buildInfo = getBuildInfo();
  return { props: { posts, buildInfo } }
}

export default function Home({ dark, changeMode, buildInfo, posts }) {
  return (
    <Layout dark={dark} changeMode={changeMode} buildInfo={buildInfo}
      title="Home" postPage={false} data={{}} activeLink={1}>
      <h1>Posts</h1>
      {posts.map(post => (
        <ArticleCard dark={dark} key={post.name} name={post.name} title={post.title}
          time={post.time} plain={post.plain} tag={post.tag} />
      ))}
    </Layout>
  )
}
