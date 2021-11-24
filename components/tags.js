export default function Tags({ tags }) {
  return <>
    <div className="flex gap-2">
      {tags.split(" ").map(tag => <a href="#" className="
        rounded px-1.5 py-0.5 no-underline
        bg-primary-100 text-primary-600
        hover:bg-primary-600 hover:text-gray-100
        dark:bg-primary-900 dark:text-primary-400
        dark:hover:bg-primary-400 dark:hover:text-gray-100
      ">{tag}</a>)}
    </div>
  </>;
}
