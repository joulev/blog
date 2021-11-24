import SidebarInfo from "./info";
import SidebarNavlink from "./navlink";

export default function Sidebar() {
  return <>
    <SidebarInfo />
    <SidebarNavlink active={2} />
  </>;
}
