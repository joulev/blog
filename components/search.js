import Tag from "./tags";

export function SearchBox({ onChange, initial }) {
  return <>
    <input type="text" placeholder="Search…" onChange={(e) => onChange(e.target.value)}
      defaultValue={initial} className="
        w-full outline-none border rounded border-solid border-gray-400 dark:border-gray-600
        placeholder-gray-500 text-xl px-4 py-2 mb-5 bg-gray-200 dark:bg-gray-800
        focus:border-primary-600 dark:focus:border-primary-400
      " />
  </>;
}

export function SearchPlaceholder({ type }) {
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
          <li className="mb-2 ml-4">
            You can search for tags with the <code className="text-xs">tag:</code>{" "}
            keyword. For example, you can search for tag <Tag tag="web" /> with{" "}
            <code className="text-xs">tag:web</code>.
          </li>
          <li className="mb-2 ml-4">
            While posts do not have to match all words in the query to be matched,
            if you use any <code className="text-xs">tag:</code> keywords in the
            query, posts have to contain all of those keywords to be matched.
          </li>
          <li className="mb-2 ml-4">
            This search engine does not take misspelling into account. Thus, to
            get the best result, please ensure your spelling is correct.
          </li>
          <li className="mb-2 ml-4">
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
