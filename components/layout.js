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
      sideBarHidden: true,
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
  naviBtns = (checkDark, additionalDark, additionalLight) => {
    return checkDark
    ? `${styles.topBtnsDark}
       ${this.state.downEnough && this.state.sideBarHidden ? styles.downEnoughDark : styles.notDownEnoughDark}
       ${additionalDark}`
    : `${styles.topBtnsLight}
       ${this.state.downEnough && this.state.sideBarHidden ? styles.downEnoughLight : styles.notDownEnoughLight}
       ${additionalLight}`;
  }
  render() {
    return (
      <>
      <Head>
        <title>{this.props.title} - joulev's blog</title>
      </Head>
      <div className="container">
        <div className="row">
          <CSSTransition in={!this.state.sideBarHidden} timeout={1000}
            classNames={this.props.dark ? {
              enter:        styles.leftPanelEnterDark,
              enterActive:  styles.leftPanelEnterActiveDark,
              enterDone:    styles.leftPanelEnterDoneDark,
              exit:         styles.leftPanelExitDark,
              exitActive:   styles.leftPanelExitActiveDark
            } : {
              enter:        styles.leftPanelEnterLight,
              enterActive:  styles.leftPanelEnterActiveLight,
              enterDone:    styles.leftPanelEnterDoneLight,
              exit:         styles.leftPanelExitLight,
              exitActive:   styles.leftPanelExitActiveLight
            }}>
            <div className={`col-md-4 ${this.props.dark ? styles.leftPanelDark : styles.leftPanelLight}`}>
              <LeftPanel dark={this.props.dark} />
            </div>
          </CSSTransition>
          <div className="col-md-8">
            <Content dark={this.props.dark} postPage={this.props.postPage}
              content={this.props.postPage ? this.props.content : this.props.children}
              data={this.props.data} />
          </div>
        </div>
        <div className={this.naviBtns(this.props.dark, styles.toggleDark, styles.toggleLight)}
          onClick={() => this.changeSideBarState()}>
          <CSSTransition in={!this.state.sideBarHidden} timeout={1000}
            classNames={this.props.dark ? {
              enter:        styles.toggleEnterDark,
              enterActive:  styles.toggleEnterActiveDark,
              enterDone:    styles.toggleEnterDoneDark,
              exit:         styles.toggleExitDark,
              exitActive:   styles.toggleExitActiveDark
            } : {
              enter:        styles.toggleEnterLight,
              enterActive:  styles.toggleEnterActiveLight,
              enterDone:    styles.toggleEnterDoneLight,
              exit:         styles.toggleExitLight,
              exitActive:   styles.toggleExitActiveLight
            }}>
            <svg width="24" height="24">
              <line x1="0" y1="6" x2="24" y2="6" />
              <line x1="0" y1="18" x2="24" y2="18" />
            </svg>
          </CSSTransition>
        </div>
        <Link href="/" passHref>
          <div className={this.naviBtns(this.props.dark, styles.homeBtnDark, styles.homeBtnLight)}>
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