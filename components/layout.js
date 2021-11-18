import React from "react";
import Head from "next/head";
import Link from "next/link";
import { CSSTransition } from "react-transition-group";
import LeftPanel from "./leftPanel";
import Content from "./content";
import styles from "./layout.module.scss";
import { getThemeClassName } from "../lib/utils";

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarHidden: true,
      justChangedTheme: false,
      downEnough: false
    }
  }
  componentDidMount() {
    window.addEventListener("scroll", this.onScroll)
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll)
  }
  onScroll = () => {
    const scrollTop = window.scrollY;
    if (this.state.downEnough) {
      if (scrollTop < 30) this.setState({ downEnough: false });
    } else {
      if (scrollTop >= 30) this.setState({ downEnough: true });
    }
  }
  changeSideBarState = () => {
    this.setState({ sideBarHidden: !this.state.sideBarHidden });
  }
  changeMode = () => {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    this.setState({ justChangedTheme: screenWidth < 768 });
    this.props.changeMode();
  }
  render() {
    return (
      <>
      <Head>
        <title>{this.props.title} - joulev's blog</title>
      </Head>
      <div className="container">
        <div className="row">
          <CSSTransition in={!this.state.sideBarHidden} timeout={600}
            classNames={{
              enter:        styles.leftPanelEnter,
              enterActive:  styles.leftPanelEnterActive,
              enterDone:    styles.leftPanelEnterDone,
              exit:         styles.leftPanelExit,
              exitActive:   styles.leftPanelExitActive
            }} onExit={() => this.setState({ justChangedTheme: false })}>
            <div className={`col-md-4 ${styles.leftPanel} ${getThemeClassName(styles, this.props.dark)}
              ${this.state.justChangedTheme ? styles.leftPanelEnterDone : ""}`}>
              <LeftPanel dark={this.props.dark} changeMode={this.changeMode} activeLink={this.props.activeLink} />
            </div>
          </CSSTransition>
          <div className={`col-md-8 ${styles.contentPanel}`}>
            <Content dark={this.props.dark} postPage={this.props.postPage}
              content={this.props.postPage ? this.props.content : this.props.children}
              data={this.props.data} />
            {this.props.postPage && this.props.children ? <div>{this.props.children}</div> : null}
          </div>
        </div>
        <div className={`${styles.topBtns}
          ${this.state.downEnough && this.state.sideBarHidden ? styles.downEnough : styles.notDownEnough}
          ${styles.toggle} ${getThemeClassName(styles, this.props.dark)}`} onClick={() => this.changeSideBarState()}>
          <CSSTransition in={!this.state.sideBarHidden} timeout={600}
            classNames={{
              enter:        styles.toggleEnter,
              enterActive:  styles.toggleEnterActive,
              enterDone:    styles.toggleEnterDone,
              exit:         styles.toggleExit,
              exitActive:   styles.toggleExitActive
            }}>
            <svg width="24" height="24">
              <line x1="0" y1="6" x2="24" y2="6" />
              <line x1="0" y1="18" x2="24" y2="18" />
            </svg>
          </CSSTransition>
        </div>
        <Link href="/" passHref>
          <div className={`${styles.topBtns}
            ${this.state.downEnough && this.state.sideBarHidden ? styles.downEnough : styles.notDownEnough}
            ${styles.homeBtn} ${getThemeClassName(styles, this.props.dark)}`}>
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