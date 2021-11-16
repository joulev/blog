import styles from "./searchBox.module.scss";
import { getThemeClassName } from "../lib/utils";

export default function SearchBox({ dark, onChange }) {
  return (
    <input className={`form-control form-control-lg ${styles.all} ${getThemeClassName(styles, dark)}`}
      type="text" placeholder="Search…" onChange={(e) => onChange(e.target.value)} />
  );
}