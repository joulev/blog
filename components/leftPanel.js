import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import styles from "./leftPanel.module.scss";
import { getThemeClassName } from "../lib/utils";

export default function LeftPanel(props) {
  return (
    <div className={`${styles.all}`}>
      <div className="text-center pb-4">
        <div className={styles.avatarContainer}>
          <Image src="/avatar.jpg" width={150} height={150} alt="joulev" className={styles.avatar}/>
        </div>
        <h3 className={styles.name}>Vu Van Dung</h3>
        <a href="https://github.com/joulev" target="_blank" rel="noreferrer" className="text-muted">@joulev</a>
      </div>
      <div className={`${styles.btnGroup} ${getThemeClassName(styles, props.dark)}`}>
        <div><Link href="/"      ><a className={props.activeLink === 1 ? styles.active : ""}>Home</a></Link></div>
        <div><Link href="/about" ><a className={props.activeLink === 2 ? styles.active : ""}>About me</a></Link></div>
        <div><Link href="/search"><a className={props.activeLink === 3 ? styles.active : ""}>Search</a></Link></div>
      </div>
      <div className={styles.footer}>
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" role="switch" id="darkModeCheck" checked={props.dark}
            onChange={() => props.changeMode()} />
          <label className="form-check-label" htmlFor="darkModeCheck">Dark mode</label>
        </div>
        <div className="small text-muted">
          Site built with <a href="https://nextjs.org" target="_blank" rel="noreferrer">Next.js</a>.<br />
          Commit <code className="text-muted">{props.versionInfo.hash}</code>{" "}
          ({moment(props.versionInfo.time).format("HH:mm:ss D/MM/y")})
        </div>
      </div>
    </div>
  );
}