import Tag from "../tags/tag";

const liStyles = "mb-2 ml-4";

export default function SearchPlaceholder({ type }) {
  if (type === "not found")
    return <>
      <div>
        <h1>Not found</h1>
        <p>Your first query did not give any results.</p>
      </div>
      <hr />
    </>;
  if (type === "guide")
    return (
      <div className="text-sm text-gray-500">
        <ul>
          <li className={liStyles}>
            You can search for tags with the <code className="text-xs">tag:</code>{" "}
            keyword. For example, you can search for tag <Tag tag="web" /> with{" "}
            <code className="text-xs">tag:web</code>.
          </li>
          <li className={liStyles}>
            While posts do not have to match all words in the query to be matched,
            if you use any <code className="text-xs">tag:</code> keywords in the
            query, posts have to contain all of those keywords to be matched.
          </li>
          <li className={liStyles}>
            This search engine does not take misspelling into account. Thus, to
            get the best result, please ensure your spelling is correct.
          </li>
          <li className={liStyles}>
            This search engine is case-insensitive.
          </li>
        </ul>
      </div>
    );
  return (
    <div>
      You should not see this text. If this text appears, please report to {" "}
      <a href="mailto:joulev.vvd@yahoo.com" target="_blank" rel="noreferrer">joulev.vvd@yahoo.com</a>.
    </div>
  );
}
