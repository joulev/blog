import Image from "next/image";
import Link from "next/link";
import styles from "./leftPanel.module.scss";

export default function LeftPanel() {
  return (
    <div className={`${styles.all} py-4`}>
      <div className="text-center pb-4">
        <Image src="/avatar.jpg" width={150} height={150} alt="joulev" />
        <h3>Vu Van Dung</h3>
        <a href="https://github.com/joulev" className="text-muted">@joulev</a>
      </div>
      <div className={styles.btnGroup}>
        <Link href="/"><a>Home</a></Link>
        <a href="#">About</a>
        <a href="#">Search</a>
        <a href="#">Categories</a>
      </div>
      <div className={styles.footer}>
        <div className="small text-muted">
          Site built with <a href="https://nextjs.org">Next.js</a>.
        </div>
        <div>Dark mode</div>
      </div>
    </div>
  );
}