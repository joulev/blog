import Layout from "../components/layout";
import getCommitInfo from "../lib/getCommitInfo";

export function getStaticProps() {
  const versionInfo = getCommitInfo();
  return { props: { versionInfo } }
}

export default function NotFound({ dark, changeMode, versionInfo }) {
  return (
    <Layout dark={dark} changeMode={changeMode} versionInfo={versionInfo}
      title="Page not found" postPage={false} data={{}} activeLink={0}>
      <h1>Page not found</h1>
      <p>The page you requested could not be found.</p>
      <p>
        If you typed the URL yourself, probably you mistyped a character or two.
        Please check for any typo and try again.
      </p>
      <p>
        If you got here by following another link in this page, it is a bug, so
        please contact me at {" "}
        <a href="mailto:joulev.vvd@yahoo.com" target="_blank" rel="noreferrer">joulev.vvd@yahoo.com</a>.
      </p>
      <p>Error code: <code>404</code></p>
    </Layout>
  )
}
