import styles from "./tag.module.scss";

export default function Tag({ tagName }) {
  return <a href="#" className={styles.tag}>{tagName}</a>;
}
