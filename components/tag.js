import styles from "./tag.module.scss";

export default function Tag(props) {
  return <a href="#" className={props.dark ? styles.tagDark : styles.tagLight}>{props.tagName}</a>;
}
