import moment from "moment";
import Layout from "../components/layout";

export function getStaticProps() {
  const buildTime = moment().format("HH:mm:ss D/MM/YY (ZZ)");
  return { props: { buildTime } }
}

export default function NotFound({ dark, changeMode, buildTime }) {
  return (
    <Layout dark={dark} changeMode={changeMode} buildTime={buildTime}
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
