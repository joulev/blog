import styles from "./tag.module.scss";

export default function Tag(props) {
  return <a href="#" className={`${styles.tag} ${props.class}`}>{props.tagName}</a>;
}
