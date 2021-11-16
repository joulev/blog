import { Component, useState } from "react";
import Layout from "../components/layout";
import SearchBox from "../components/searchBox";
import { listPosts } from "../lib/getPosts";
import { parseSearchQuery } from "../lib/search";

export async function getStaticProps() {
  const posts = listPosts();
  return { props: { posts } };
}

function printParsedQuery(query) {
  const parsed = parseSearchQuery(query);
  let str = "tags: [";
  parsed.tags.map(tag => str += `"${tag}", `);
  str += "]\nwords: [";
  parsed.words.map(word => str += `"${word}", `);
  str += "]";
  return str;
}

export default function Search(props) {
  const [query, setQuery] = useState("");
  const [stillTyping, setStillTyping] = useState(false);
  const [currentTimeout, setCurrentTimeout] = useState(null);
  const onSearchChange = query => {
    clearTimeout(currentTimeout);
    setQuery(query);
    setStillTyping(true);
    setCurrentTimeout(setTimeout(() => setStillTyping(false), 1000));
  }
  return <Layout dark={props.dark} changeMode={props.changeMode} title="Search"
    postPage={false} data={{}} activeLink={3}>
    <SearchBox dark={props.dark} onChange={q => onSearchChange(q)} />
    <p>{query}</p>
    <p>{stillTyping ? "still typing" : printParsedQuery(query)}</p>
  </Layout>;
}
