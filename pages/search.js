import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ArticleCard from "../components/articleCard";
import Layout from "../components/layout";
import SearchBox from "../components/searchBox";
import SearchPlaceholder from "../components/searchingPlaceholder";
import { listPosts } from "../lib/getPosts";
import { filterPosts, parseSearchQuery } from "../lib/search";

export async function getStaticProps() {
  const posts = listPosts();
  return { props: { posts } };
}

export default function Search(props) {
  const router = useRouter();
  // for some reasons router doesnt work well, so I have to implement it myself
  const getQuery = () => {
    const urlArr = window.location.href.split("?");
    if (urlArr.length === 1) return "";
    const paramArr = urlArr[1].split("&");
    for (let i = 0; i < paramArr.length; i++) {
      if (paramArr[i].split("=")[0] === "q")
        return decodeURIComponent(paramArr[i].split("=")[1]);
    }
    return "";
  };
  const [query, setQuery] = useState("");
  const [stillTyping, setStillTyping] = useState(true);
  const [currentTimeout, setCurrentTimeout] = useState(null);
  const [postsFiltered, setPostsFiltered] = useState([]);
  useEffect(() => {
    const q = getQuery();
    setQuery(q);
    setPostsFiltered(filterPosts(props.posts, q));
    setStillTyping(false);
  }, [props.posts]);
  const updateQuery = query => {
    setQuery(query);
    router.push(query === "" ? "/search" : `/search?q=${encodeURIComponent(query)}`, undefined, { shallow: true });
    clearTimeout(currentTimeout);
    setStillTyping(true);
    setCurrentTimeout(setTimeout(() => {
      setStillTyping(false);
      setPostsFiltered(filterPosts(props.posts, query));
    }, 500));
  };
  return <Layout dark={props.dark} changeMode={props.changeMode} title="Search"
    postPage={false} data={{}} activeLink={3}>
    <SearchBox dark={props.dark} onChange={q => updateQuery(q)} initial={query} />
    {(() => {
      const parsedQuery = parseSearchQuery(query);
      if (parsedQuery.tags.length === 0 && parsedQuery.words.length === 0)
        return <SearchPlaceholder dark={props.dark} type="guide" />;
      if (stillTyping) return <SearchPlaceholder dark={props.dark} type="searching" />;
      if (postsFiltered.length === 0)
        return (
          <>
          <SearchPlaceholder dark={props.dark} type="not found" />
          <SearchPlaceholder dark={props.dark} type="guide" />
          </>
        );
      return (
        <>
        <p><em>Found {postsFiltered.length} result{postsFiltered.length != 1 && "s"}</em></p>
        {postsFiltered.map(post => (
          <ArticleCard dark={props.dark} key={post.name} name={post.name} title={post.title}
            time={post.time} plain={post.plain} tag={post.tag} />
        ))}
        </>
      );
    })()}
  </Layout>;
}
