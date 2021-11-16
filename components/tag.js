import styles from "./tag.module.scss";
import { getThemeClassName } from "../lib/utils";

export default function Tag(props) {
  return <a href="#" className={`${styles.tag} ${getThemeClassName(styles, props.dark)}`}>{props.tagName}</a>;
}
