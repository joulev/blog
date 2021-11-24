import Layout from "../components/layout";

export default function Home({ dark, changeMode }) {
  return <>
    <Layout dark={dark} changeMode={changeMode} title="Search" sideLink={3}>
      Hello, world!
    </Layout>
  </>;
}
