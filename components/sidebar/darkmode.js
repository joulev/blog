export default function SidebarDarkToggler({ dark, changeMode }) {
  return <>
    <label className="mb-5 flex items-center">
      <input checked={dark} onChange={() => changeMode()} type="checkbox" role="switch"
        className="appearance-none peer" />
      <span className="
        h-5 w-8 px-px mr-2 flex items-center rounded-full
        bg-gray-100 peer-checked:bg-primary-400
        border border-solid border-gray-400 peer-checked:border-primary-400
        after:h-3 after:w-3 after:rounded-full after:transition-all
        after:translate-x-0.5 peer-checked:after:translate-x-3.5
        after:bg-gray-400 peer-checked:after:bg-gray-100
      " />
      Dark mode
    </label>
  </>;
}
