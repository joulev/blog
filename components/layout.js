import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { CSSTransition } from "react-transition-group";
import LeftPanel from "./leftPanel";
import Content from "./content";
import { getThemeClassName } from "../lib/utils";
import styles from "./layout.module.scss";

export default function Layout(props) {
  const [sideBarHidden, setSideBarHidden] = useState(true);
  const [justChangedTheme, setJustChangedTheme] = useState(false);
  const [downEnough, setDownEnough] = useState(false);
  const changeMode = () => {
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    setJustChangedTheme(screenWidth < 768);
    props.changeMode();
  };
  const onScroll = () => {
    const scrollTop = window.scrollY;
    if (scrollTop < 30) setDownEnough(false);
    else setDownEnough(true);
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <>
    <Head>
      <title>{props.title} - joulev's blog</title>
    </Head>
    <div className="container">
      <div className="row">
        <CSSTransition in={!sideBarHidden} timeout={600}
          classNames={{
            enter:        styles.leftPanelEnter,
            enterActive:  styles.leftPanelEnterActive,
            enterDone:    styles.leftPanelEnterDone,
            exit:         styles.leftPanelExit,
            exitActive:   styles.leftPanelExitActive
          }} onExit={() => setJustChangedTheme(false)}>
          <div className={`col-md-4 ${styles.leftPanel} ${getThemeClassName(styles, props.dark)}
            ${justChangedTheme ? styles.leftPanelEnterDone : ""}`}>
            <LeftPanel dark={props.dark} changeMode={changeMode}
              versionInfo={props.versionInfo} activeLink={props.activeLink} />
          </div>
        </CSSTransition>
        <div className={`col-md-8 ${styles.contentPanel}`}>
          <Content dark={props.dark} postPage={props.postPage}
            content={props.postPage ? props.content : props.children}
            data={props.data} />
          {props.postPage && props.children ? <div>{props.children}</div> : null}
        </div>
      </div>
      <div className={`${styles.topBtns}
          ${downEnough && sideBarHidden ? styles.downEnough : styles.notDownEnough}
          ${styles.toggle} ${getThemeClassName(styles, props.dark)}`}
        onClick={() => setSideBarHidden(!sideBarHidden)}>
        <CSSTransition in={!sideBarHidden} timeout={600}
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
          ${downEnough && sideBarHidden ? styles.downEnough : styles.notDownEnough}
          ${styles.homeBtn} ${getThemeClassName(styles, props.dark)}`}>
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
  </>;
}
