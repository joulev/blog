import Date from "./date";
import TagList from "./tagList";
import styles from "./content.module.scss";

export default function Content(props) {
  return props.postPage ? (
    <div className={styles.all}>
      <div className={styles.heading}>
        <h1>{props.data.title}</h1>
        <div className={styles.metadata}>
          <div className={`${styles.date} fs-5 text-muted`}><Date time={props.data.time} /></div>
          <TagList dark={props.dark} tags={props.data.tag} />
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: props.content }} />
    </div>
  ) : (
    <div className={styles.all}>{props.content}</div>
  );
}