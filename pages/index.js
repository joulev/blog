import ArticleCard from "../components/articleCard";
import Layout from "../components/layout";
import { listPosts } from "../lib/getPosts";

export function getStaticProps() {
  const posts = listPosts();
  return { props: { posts } }
}

export default function Home({ dark, changeMode, posts }) {
  return <>
    <Layout dark={dark} changeMode={changeMode} title="Home" sideLink={1}>
      <h1>Posts</h1>
      {posts.map(post => <ArticleCard post={post} key={post.name} />)}
    </Layout>
  </>;
}
