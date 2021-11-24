import Layout from "../../components/layout";
import ArticleCard from "../../components/articleCard";
import { getTagInformation, getTags } from "../../lib/getTags";
import Tag from "../../components/tags/tag";
import getCommitInfo from "../../lib/getCommitInfo";

export function getStaticPaths() {
  const tags = getTags();
  const routerArr = tags.map(tag => {
    return { params: { id: tag } };
  });
  return { paths: routerArr, fallback: false }
}

export function getStaticProps({ params }) {
  const info = getTagInformation(params.id);
  const versionInfo = getCommitInfo();
  return {
    props: {
      versionInfo,
      tag: params.id,
      description: info.description || "(no description)",
      posts: info.postList
    }
  }
}

export default function TagPage({ dark, changeMode, versionInfo, tag, description, posts }) {
  return <>
    <Layout dark={dark} changeMode={changeMode} versionInfo={versionInfo}
      title={`Tag [${tag}]`} sideLink={0}>
      <Tag tag={tag} big />
      <p className={description === "(no description)" ? "text-gray-500" : ""}>{description}</p>
      {posts.map(post => <ArticleCard post={post} key={post.name} />)}
    </Layout>
  </>;
}
