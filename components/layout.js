import Head from "next/head";
import LeftPanel from "./leftPanel";
import Content from "./content";

export default function Layout(props) {
  return (
    <>
    <Head>
      <title>{props.title} - joulev's blog</title>
    </Head>
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <LeftPanel />
        </div>
        <div className="col-md-8">
          <Content postPage={props.postPage} content={props.postPage ? props.content : props.children} data={props.data} />
        </div>
      </div>
    </div>
    </>
  );
}