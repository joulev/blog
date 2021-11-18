import moment from "moment";
import Layout from "../components/layout";
import ArticleCard from "../components/articleCard";
import { listPosts } from "../lib/getPosts";

export function getStaticProps() {
  const posts = listPosts();
  const buildTime = moment().format("HH:mm:ss D/MM/YY (ZZ)");
  return { props: { posts, buildTime } }
}

export default function Home({ dark, changeMode, buildTime, posts }) {
  return (
    <Layout dark={dark} changeMode={changeMode} buildTime={buildTime}
      title="Home" postPage={false} data={{}} activeLink={1}>
      <h1>Posts</h1>
      {posts.map(post => (
        <ArticleCard dark={dark} key={post.name} name={post.name} title={post.title}
          time={post.time} plain={post.plain} tag={post.tag} />
      ))}
    </Layout>
  )
}
