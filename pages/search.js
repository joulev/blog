import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ArticleCard from "../components/articleCard";
import Layout from "../components/layout";
import SearchBox from "../components/search/searchBox";
import SearchPlaceholder from "../components/search/placeholder";
import { listPosts } from "../lib/getPosts";
import { filterPosts, parseSearchQuery } from "../lib/search";
import getCommitInfo from "../lib/getCommitInfo";

export function getStaticProps() {
  const posts = listPosts();
  const versionInfo = getCommitInfo();
  return { props: { posts, versionInfo } }
}

export default function Search({ dark, changeMode, versionInfo, posts }) {
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
  const [postsFiltered, setPostsFiltered] = useState([]);
  useEffect(() => {
    const q = getQuery();
    setQuery(q);
    setPostsFiltered(filterPosts(posts, q));
  }, [posts]);
  const updateQuery = query => {
    setQuery(query);
    router.push(query === "" ? "/search" : `/search?q=${encodeURIComponent(query)}`, undefined, { shallow: true });
    setPostsFiltered(filterPosts(posts, query));
  };

  return <>
    <Layout dark={dark} changeMode={changeMode} versionInfo={versionInfo}
      title="Search" sideLink={3}>
      <SearchBox onChange={q => updateQuery(q)} initial={query} />
      {(() => {
        const parsedQuery = parseSearchQuery(query);
        if (parsedQuery.tags.length === 0 && parsedQuery.words.length === 0)
          return <SearchPlaceholder type="guide" />;
        if (postsFiltered.length === 0)
          return <>
            <SearchPlaceholder type="not found" />
            <SearchPlaceholder type="guide" />
          </>;
        return <>
          <p><em>Found {postsFiltered.length} result{postsFiltered.length != 1 && "s"}</em></p>
          {postsFiltered.map(post => <ArticleCard post={post} key={post.name} />)}
        </>;
      })()}
    </Layout>
  </>;
}
