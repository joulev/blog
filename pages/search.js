import { useState } from "react";
import ArticleCard from "../components/articleCard";
import Layout from "../components/layout";
import SearchBox from "../components/searchBox";
import { listPosts } from "../lib/getPosts";
import { filterPosts } from "../lib/search";

export async function getStaticProps() {
  const posts = listPosts();
  return { props: { posts } };
}

export default function Search(props) {
  const [query, setQuery] = useState("");
  const [stillTyping, setStillTyping] = useState(false);
  const [currentTimeout, setCurrentTimeout] = useState(null);
  const [postsFiltered, setPostsFiltered] = useState(props.posts);
  const onSearchChange = query => {
    clearTimeout(currentTimeout);
    setQuery(query);
    setStillTyping(true);
    setPostsFiltered(filterPosts(props.posts, query));
    setCurrentTimeout(setTimeout(() => finishTyping(), 1000));
  }
  const finishTyping = () => {
    setStillTyping(false);
  }
  return <Layout dark={props.dark} changeMode={props.changeMode} title="Search"
    postPage={false} data={{}} activeLink={3}>
    <SearchBox dark={props.dark} onChange={q => onSearchChange(q)} />
    {stillTyping ? <p>still typing</p> : postsFiltered.map(post => (
      <ArticleCard dark={props.dark} key={post.name} name={post.name} title={post.title}
        time={post.time} plain={post.plain} tag={post.tag} />
    ))}
  </Layout>;
}
