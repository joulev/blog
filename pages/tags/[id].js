import moment from "moment";
import Layout from "../../components/layout";
import ArticleCard from "../../components/articleCard";
import { getTagInformation, getTags } from "../../lib/getTags";
import BigTag from "../../components/bigTag";

export function getStaticPaths() {
  const tags = getTags();
  const routerArr = tags.map(tag => {
    return { params: { id: tag } };
  });
  return {
    paths: routerArr,
    fallback: false
  }
}

export function getStaticProps({ params }) {
  const info = getTagInformation(params.id);
  const buildTime = moment().format("HH:mm:ss D/MM/YY (ZZ)");
  return {
    props: {
      buildTime,
      tag: params.id,
      description: info.description || "(no description)",
      posts: info.postList
    }
  }
}

export default function TagPage(props) {
  return (
    <Layout dark={props.dark} changeMode={props.changeMode} buildTime={props.buildTime}
      title={`Tag [${props.tag}]`} postPage={false} data={{}} activeLink={0}>
      <BigTag dark={props.dark} tagName={props.tag} />
      <p className={props.description === "(no description)" ? "text-muted" : ""}>{props.description}</p>
      {props.posts.map(post => (
        <ArticleCard dark={props.dark} key={post.name} name={post.name} title={post.title}
          time={post.time} plain={post.plain} tag={post.tag} />
      ))}
    </Layout>
  );
}
