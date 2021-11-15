import Tag from "./tag";
import styles from "./tagList.module.scss";

export default function TagList({ tags }) {
  return (
    <div className={styles.all}>
      {tags.split(" ").map(tag => <Tag tagName={tag} key={tag} />)}
    </div>
  );
}
