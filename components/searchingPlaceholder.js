import styles from "./searchPlaceholder.module.scss";
import Tag from "./tag";

export default function SearchPlaceholder({ dark, type }) {
  if (type === "searching")
    return (
      <div className="pt-5 text-center">
        <div className={`spinner-border mb-3 ${styles.largeSpinner}`} role="status" />
        <div className="fs-3">searching...</div>
      </div>
    );
  if (type === "not found")
    return (
      <>
      <div>
        <h1>Not found</h1>
        <p>Your first query did not give any results.</p>
      </div>
      <hr />
      </>
    );
  if (type == "guide") {
    return (
      <div className="small text-muted">
        <ul>
          <li>
            You can search for tags with the <code>tag:</code> keyword. For example,
            you can search for tags <Tag dark={dark} tagName="cs1010" /> with {" "}
            <code>tag:cs1010</code>.
          </li>
          <li>
            This search engine does not take misspelling into account. Thus, to
            get the best result, please ensure your spelling is correct.
          </li>
        </ul>
      </div>
    )
  }
  return (
    <div>
      You should not see this text. If this text appears, please report to {" "}
      <a href="mailto:joulev.vvd@yahoo.com" target="_blank" rel="noreferrer">joulev.vvd@yahoo.com</a>.
    </div>
  );
}
