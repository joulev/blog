import styles from "./loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.all}>
      <div className={`spinner-border mb-3 ${styles.spinner}`} role="status" />
      <div className="fs-3">loading...</div>
    </div>
  );
}
