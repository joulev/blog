import React from "react";
import Head from "next/head";
import Link from "next/link";
import { CSSTransition } from "react-transition-group";
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
  changeSideBarState = () => {
    this.setState({ sideBarHidden: !this.state.sideBarHidden });
  }
  render() {
    return (
      <>
      <Head>
        <title>{this.props.title} - joulev's blog</title>
      </Head>
      <div className="container">
        <div className="row">
          <CSSTransition in={!this.state.sideBarHidden} timeout={10000}
            classNames={{
              enter: styles.leftPanelEnter,
              enterActive: styles.leftPanelEnterActive,
              exit: styles.leftPanelExit,
              exitActive: styles.leftPanelExitActive
            }}>
            <div className={`col-md-4 ${styles.leftPanel}`}>
              <LeftPanel />
            </div>
          </CSSTransition>
          <div className="col-md-8">
            <Content postPage={this.props.postPage}
              content={this.props.postPage ? this.props.content : this.props.children}
              data={this.props.data} />
          </div>
        </div>
        <div className={`${styles.topBtns} ${styles.toggle}`} onClick={() => this.changeSideBarState()}>
          <svg width="24" height="24" className={this.state.sideBarHidden ? "" : styles.sideBarNormal}>
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