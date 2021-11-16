import Link from "next/link";
import styles from "./bigTag.module.scss";
import { getThemeClassName } from "../lib/utils";

export default function BigTag(props) {
  return (
    <Link href={`/tags/${props.tagName}`}>
      <a className={`h1 ${styles.tag} ${getThemeClassName(styles, props.dark)}`}>{props.tagName}</a>
    </Link>
  );
}
