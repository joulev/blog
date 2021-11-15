import React from "react";
import Head from "next/head";
import Link from "next/link";
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
        <div className={`${styles.topBtns} ${styles.toggle}`} onClick={() => {this.setState( { sideBarHidden: !this.state.sideBarHidden } )}}>
          <svg width="24" height="24">
            <line x1="0" y1="6" x2="24" y2="6" />
            <line x1="0" y1="18" x2="24" y2="18" />
          </svg>
        </div>
        <Link href="/">
          <div className={`${styles.topBtns} ${styles.homeBtn}`}>
            <svg width="24" height="24">
              <line x1= "6" y1="20" x2="18" y2="20" />
              <line x1= "6" y1="20" x2= "6" y2= "8" />
              <line x1="18" y1="20" x2="18" y2= "8" />
              <line x1="12" y1= "2" x2= "3" y2="11" />
              <line x1="12" y1= "2" x2="21" y2="11" />
              <line x1="18" y1= "8" x2="18" y2= "0" style={{ strokeWidth: "3px" }} />
            </svg>
          </div>
        </Link>
      </div>
      </>
    );
  }
}