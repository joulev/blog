import Date from "./date";
import Tag from "./tag";
import styles from "./content.module.scss";

export default function Content(props) {
  return props.postPage ? (
    <div className={styles.all}>
      <div className={styles.heading}>
        <h1>{props.data.title}</h1>
        <div className={styles.metadata}>
          <div className={`${styles.date} fs-5 text-muted`}><Date time={props.data.time} /></div>
          <div className={styles.tagList}>
            {props.data.tag.split(" ").map(tag => <Tag tagName={tag} key={tag} />)}
          </div>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: props.content }} />
    </div>
  ) : (
    <div className={styles.all}>{props.content}</div>
  );
}