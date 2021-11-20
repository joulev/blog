import Image from "next/image";
import Link from "next/link";
import Footer from "./footer";
import styles from "./leftPanel.module.scss";
import { getThemeClassName } from "../lib/utils";

export default function LeftPanel(props) {
  return (
    <div className={`${styles.all} ${getThemeClassName(styles, props.dark)}`}>
      <div className={`text-center pb-3 ${styles.infoContainer}`}>
        <div>
          <Image src="/avatar.jpg" width={100} height={100} alt="joulev"
            className={`${styles.avatar} ${getThemeClassName(styles, props.dark)}`}/>
        </div>
        <div>
          <h3>Vu Van Dung</h3>
          <a href="https://github.com/joulev" target="_blank" rel="noreferrer" className="text-muted">@joulev</a>
        </div>
      </div>
      <div className={`${styles.btnGroup} ${getThemeClassName(styles, props.dark)}`}>
        <Link href="/"      ><a className={props.activeLink === 1 ? styles.active : ""}>Home</a></Link>
        <Link href="/about" ><a className={props.activeLink === 2 ? styles.active : ""}>About me</a></Link>
        <Link href="/search"><a className={props.activeLink === 3 ? styles.active : ""}>Search</a></Link>
      </div>
      <div className={styles.footer}>
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" role="switch" id="darkModeCheck" checked={props.dark}
            onChange={() => props.changeMode()} />
          <label className="form-check-label" htmlFor="darkModeCheck">Dark mode</label>
        </div>
        <div className="d-none d-md-block">
          <Footer versionInfo={props.versionInfo} className="" />
        </div>
      </div>
    </div>
  );
}