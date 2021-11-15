import Tag from "./tag";
import styles from "./tagList.module.scss";

export default function TagList({ tags, dark }) {
  return (
    <div className={styles.all}>
      {tags.split(" ").map(tag => <Tag dark={dark} tagName={tag} key={tag} />)}
    </div>
  );
}
