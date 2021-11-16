import Link from "next/link";
import styles from "./tag.module.scss";
import { getThemeClassName } from "../lib/utils";

export default function Tag(props) {
  return (
    <Link href={`/tags/${props.tagName}`}>
      <a className={`${styles.tag} ${getThemeClassName(styles, props.dark)}`}>{props.tagName}</a>
    </Link>
  );
}
