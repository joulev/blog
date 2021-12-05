import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ArticleCard from "../components/articleCard";
import Layout from "../components/layout";
import { SearchBox, SearchPlaceholder } from "../components/search";
import { listPosts } from "../lib/getPosts";
import { getTagCount } from "../lib/getTags";
import { filterPosts, parseSearchQuery } from "../lib/search";
import getCommitInfo from "../lib/getCommitInfo";

export function getStaticProps() {
  const posts = listPosts();
  const tagCount = getTagCount();
  const versionInfo = getCommitInfo();
  return { props: { posts, tagCount, versionInfo } }
}

export default function Search({ dark, changeMode, versionInfo, posts, tagCount }) {
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
  useEffect(() => {
    router.push(query === "" ? "/search" : `/search?q=${encodeURIComponent(query)}`, undefined, { shallow: true });
    setPostsFiltered(filterPosts(posts, query));
  }, [posts, router, query]);
  return <>
    <Layout title={query ? `${query} – Search` : "Search"} sideLink={3} {...{ dark, changeMode, versionInfo }}>
      <SearchBox onChange={q => setQuery(q)} initial={query} />
      {(() => {
        const parsedQuery = parseSearchQuery(query);
        if (parsedQuery.tags.length === 0 && parsedQuery.words.length === 0)
          return <SearchPlaceholder type="guide" tagCount={tagCount} />;
        if (postsFiltered.length === 0)
          return <>
            <SearchPlaceholder type="not found" />
            <SearchPlaceholder type="guide" tagCount={tagCount} />
          </>;
        return <>
          <p><em>Found {postsFiltered.length} result{postsFiltered.length != 1 && "s"}</em></p>
          {postsFiltered.map((post, idx) => <ArticleCard {...{ post, tagCount }} bottom={idx === postsFiltered.length - 1} key={post.name}>
            <div dangerouslySetInnerHTML={{ __html: post.preview }} />
            {post.countNotPreview > 0 && <>
              <div className="text-gray-500 mt-4">
                ({post.countNotPreview} more result{post.countNotPreview !== 1 ? "s" : ""} on this page)
              </div>
            </>}
          </ArticleCard>)}
        </>;
      })()}
    </Layout>
  </>;
}
