import Layout from "../components/layout";

export default function About({ dark, changeMode }) {
  return (
    <Layout dark={dark} changeMode={changeMode} title="About me" postPage={false} data={{}}
      activeLink={2}>
      <h1>About me</h1>
      <p>Hello. I am Dung. A Computer Engineering student in the National University of Singapore.</p>
      <p>
        Um… that's it. This site is currently a playground for me to learn {" "}
        <a href="https://nextjs.org" target="_blank" rel="noreferrer">Next.js</a> {" "}
        during my free time. So if you somehow get to this site, do have a look and
        give me your feedback for the site at {" "}
        <a href="mailto:joulev.vvd@yahoo.com" target="_blank" rel="noreferrer">joulev.vvd@yahoo.com</a>.
      </p>
      <p>That's all. Thanks for reading.</p>
    </Layout>
  )
}