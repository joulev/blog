import Footer from "../footer";
import SidebarInfo from "./info";
import SidebarNavlink from "./navlink";

export default function Sidebar() {
  return <>
    <SidebarInfo />
    <SidebarNavlink active={1} />
    <Footer className="hidden md:block absolute bottom-4" />
  </>;
}
