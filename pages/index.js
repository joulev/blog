import Link from "next/link";
import Layout from "../components/layout";
import { listPosts } from "../lib/listPosts";
import { getPostUrlFromProps } from "../lib/utils";

export function getStaticProps() {
  const posts = listPosts();
  return {
    props: {
      posts
    }
  }
}

export default function Home({ posts }) {
  return (
    <Layout title="Home" postPage={false} data={{}}>
      <h1>Posts</h1>
      <hr />
      {posts.map(post => (
        <div key={post.id}>
          <Link href={getPostUrlFromProps(post.time, post.name)}><a>{post.title}</a></Link>
          <br />
          {post.time}
          <hr />
        </div>
      ))}
    </Layout>
  )
}
