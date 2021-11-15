import React from "react";
import Head from "next/head";
import LeftPanel from "./leftPanel";
import Content from "./content";
import styles from "./layout.module.scss";

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarHidden: true
    }
  }
  render() {
    return (
      <>
      <Head>
        <title>{this.props.title} - joulev's blog</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className={`col-md-4 ${this.state.sideBarHidden ? "d-none" : "d-block"} d-md-block`}>
            <LeftPanel />
          </div>
          <div className="col-md-8">
            <Content postPage={this.props.postPage}
              content={this.props.postPage ? this.props.content : this.props.children}
              data={this.props.data} />
          </div>
        </div>
        <div className={styles.toggle} onClick={() => {this.setState( { sideBarHidden: !this.state.sideBarHidden } )}}>
          <svg width="24" height="24">
            <line x1="0" y1="6" x2="24" y2="6" />
            <line x1="0" y1="18" x2="24" y2="18" />
          </svg>
        </div>
      </div>
      </>
    );
  }
}