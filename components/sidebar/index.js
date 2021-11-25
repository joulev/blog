import Footer from "../footer";
import SidebarDarkToggler from "./darkmode";
import SidebarInfo from "./info";
import SidebarNavlink from "./navlink";

export default function Sidebar({ dark, changeMode, versionInfo, sideLink }) {
  return <>
    <div className="mt-14">
      <SidebarInfo />
      <SidebarNavlink active={sideLink} />
      <div className="md:hidden flex flex-row-reverse">
        <SidebarDarkToggler dark={dark} changeMode={changeMode} />
      </div>
      <div className="absolute bottom-4 hidden md:block">
        <SidebarDarkToggler dark={dark} changeMode={changeMode} />
        <Footer versionInfo={versionInfo} />
      </div>
    </div>
  </>;
}
