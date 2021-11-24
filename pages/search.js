import Layout from "../components/layout";
import getCommitInfo from "../lib/getCommitInfo";

export function getStaticProps() {
  const versionInfo = getCommitInfo();
  return { props: { versionInfo } }
}

export default function Home({ dark, changeMode, versionInfo }) {
  return <>
    <Layout dark={dark} changeMode={changeMode} versionInfo={versionInfo}
      title="Search" sideLink={3}>
      Hello, world!
    </Layout>
  </>;
}
