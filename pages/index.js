import Layout from "../components/layout";

export default function Home({ dark, changeMode }) {
  return <>
    <Layout dark={dark} changeMode={changeMode} title="Home" sideLink={1}>
      Hello, world!
    </Layout>
  </>;
}
