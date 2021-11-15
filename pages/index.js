import Link from "next/link";
import Layout from "../components/layout";
import Date from "../components/date";
import TagList from "../components/tagList";
import { listPosts } from "../lib/getPosts";
import { getPostUrlFromProps, truncatePlainContent } from "../lib/utils";

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
    <Layout dark={dark} changeMode={changeMode} title="Home" postPage={false} data={{}}>
      <h1>Posts</h1>
      {posts.map(post => (
        <div className="card mb-3" key={post.name}>
          <div className="card-body">
            <Link href={getPostUrlFromProps(post.time, post.name)}>
              <a className="h5 card-title">{post.title}</a>
            </Link>
            <h6 className="small card-subtitle mt-1 mb-3 text-muted">
              <Date time={post.time} />
            </h6>
            <p className="card-text">{truncatePlainContent(post.plain)}</p>
            <TagList dark={dark} tags={post.tag} />
          </div>
        </div>
      ))}
    </Layout>
  )
}
