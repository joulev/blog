import css from "./heading.module.css";

function HeadingElement({ level, children }) {
  // would love to know a more elegant way...
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      return <span>{children}</span>;
  }
}

export default function Heading({ level, children }) {
  const idText = children[0].toLowerCase().replace(/[^\w]+/g, "-");
  return <>
    <div className={`relative pt-10 group ${css.headingContainer}`} id={idText}>
      <div className="
        invisible absolute -left-8 bottom-0 pl-2 w-10 text-xl opacity-0 transition-opacity
        hover:visible hover:opacity-100 group-hover:visible group-hover:opacity-100
      ">
        <div className="cursor-pointer text-gray-500 hover:text-gray-400 dark:hover:text-gray-600 transition"
          onClick={() => document.querySelector(`#${idText}`).scrollIntoView({ behavior: "smooth" })}>
          #
        </div>
      </div>
      <HeadingElement level={level}>{children[0]}</HeadingElement>
    </div>
  </>;
}
