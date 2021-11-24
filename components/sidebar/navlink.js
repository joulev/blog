import css from "./navlink.module.css";

export default function SidebarNavlink({ active }) {
  return <>
    <div className="flex flex-col gap-2 mb-5">
      <a href="#" className={`${css.navlink} ${active === 1 ? css.active : ""}`}>Home</a>
      <a href="#" className={`${css.navlink} ${active === 2 ? css.active : ""}`}>About me</a>
      <a href="#" className={`${css.navlink} ${active === 3 ? css.active : ""}`}>Search</a>
    </div>
  </>;
}
