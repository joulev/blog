import Layout from "../components/layout";
import ArticleCard from "../components/articleCard";
import { listPosts } from "../lib/getPosts";

export function getStaticProps() {
  const posts = listPosts();
  return {
    props: {
      posts
    }
  }
}

export default function Home({ dark, changeMode, posts }) {
  return (
    <Layout dark={dark} changeMode={changeMode} title="Home" postPage={false} data={{}}
      activeLink={1}>
      <h1>Posts</h1>
      {posts.map(post => (
        <ArticleCard dark={dark} key={post.name} name={post.name} title={post.title}
          time={post.time} plain={post.plain} tag={post.tag} />
      ))}
    </Layout>
  )
}
