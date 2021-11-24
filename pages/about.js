import Layout from "../components/layout";

export default function Home({ dark, changeMode }) {
  return <>
    <Layout dark={dark} changeMode={changeMode} title="About me" sideLink={2}>
      Hello, world!
    </Layout>
  </>;
}
