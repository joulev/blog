export default function SearchBox({ onChange, initial }) {
  return <>
    <input type="text" placeholder="Search…" onChange={(e) => onChange(e.target.value)}
      defaultValue={initial} className="
        w-full outline-none border rounded border-solid border-gray-400 dark:border-gray-600
        placeholder-gray-500 text-xl px-4 py-2 mb-5 bg-gray-200 dark:bg-gray-800
        focus:border-primary-600 dark:focus:border-primary-400
      " />
  </>;
}
