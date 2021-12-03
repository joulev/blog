import Tag from "./tags";
import css from "./search.module.css";

export function SearchBox({ onChange, initial }) {
  return <>
    <div className="relative mb-5">
      <input type="text" placeholder="Search…" onChange={(e) => onChange(e.target.value)}
        value={initial} className="
          w-full outline-none border rounded border-solid border-gray-400 dark:border-gray-600
          placeholder-gray-500 text-xl px-4 py-2 bg-gray-200 dark:bg-gray-800
          focus:border-primary-600 dark:focus:border-primary-400 peer
        " />
      <div className="absolute inset-y-0 right-2 flex items-center transition opacity-0 peer-focus:opacity-100">
        <div className="z-30 p-2 cursor-pointer transition text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
          onClick={() => onChange("")} title="Clear">
          <svg width="18" height="18">
            <line x1="3" y1="3" x2="15" y2="15" className="stroke-current stroke-2 cap-round" />
            <line x1="3" y1="15" x2="15" y2="3" className="stroke-current stroke-2 cap-round" />
          </svg>
        </div>
      </div>
    </div>
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
      <div className={`${css.small} text-gray-500`}>
        <ul>
          <li className="mb-2 ml-4">
            You can search for tags with the <code>tag:</code> keyword. For
            example, you can search for tag <Tag tag="web" /> with{" "}
            <code>tag:web</code>.
          </li>
          <li className="mb-2 ml-4">
            While posts do not have to match all words in the query to be matched,
            if you use any <code>tag:</code> keywords in the query, posts have
            to contain all of those keywords to be matched.
          </li>
          <li className="mb-2 ml-4">
            The search engine separate the query by spaces. However, if you want
            to include spaces in the query, you can wrap everything inside a pair
            of quotation marks, for example <code>hello "world and" earth</code>{" "}
            will search for three query "words": <code>hello</code>, <code>world and</code>{" "}
            and <code>earth</code>.
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

