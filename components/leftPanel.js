import Image from "next/image";
import Link from "next/link";
import styles from "./leftPanel.module.scss";

export default function LeftPanel(props) {
  return (
    <div className={`${props.dark ? styles.allDark : styles.allLight} pt-4`}>
      <div className="text-center pb-4">
        <Image src="/avatar.jpg" width={150} height={150} alt="joulev"
          className={props.dark ? styles.avatarDark : styles.avatarLight}/>
        <h3>Vu Van Dung</h3>
        <a href="https://github.com/joulev" target="_blank" rel="noreferrer" className="text-muted">@joulev</a>
      </div>
      <div className={props.dark ? styles.btnGroupDark : styles.btnGroupLight}>
        <Link href="/"><a>Home</a></Link>
        <a href="#">About</a>
        <a href="#">Search</a>
        <a href="#">Categories</a>
      </div>
      <div className={props.dark ? styles.footerDark : styles.footerLight}>
        <div className="small text-muted">
          Site built with <a href="https://nextjs.org" target="_blank" rel="noreferrer">Next.js</a>.
        </div>
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" role="switch" id="darkModeCheck" checked={props.dark}
            onChange={() => props.changeMode()} />
          <label className="form-check-label" htmlFor="darkModeCheck">Dark mode</label>
        </div>
      </div>
    </div>
  );
}