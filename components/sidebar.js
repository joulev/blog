import Image from "next/image";
import Link from "next/link";
import Footer from "./footer";

function Info() {
  return <>
    <div className="text-center">
      <div className="hidden h-sm:mb-5 h-sm:inline-flex h-sm:items-center h-sm:gap-4 h-md:block">
        <div className="w-1/3 max-w-xs h-md:w-full h-md:max-w-full h-md:text-center">
          <Image src="/avatar.jpg" width={100} height={100} alt="joulev"
            className="rounded-full border-primary-500 border-2 border-solid" />
        </div>
        <div className="text-left h-md:text-center">
          <div className="text-2xl md:text-base lg:text-lg h-md:text-2xl font-bold">Vu Van Dung</div>
          <a href="https://github.com/joulev" target="_blank" rel="noreferrer" className="text-gray-500">
            @joulev
          </a>
        </div>
      </div>
    </div>
  </>;
}

const navlinkStyles = "\
  rounded text-center py-2 no-underline \
  text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700";
const activeStyles = "\
  bg-primary-100 hover:bg-primary-100 dark:bg-primary-900 dark:hover:bg-primary-900 \
  font-bold text-primary-600 dark:text-primary-400";
function Navlink({ active }) {
  return <>
    <div className="flex flex-col gap-2 mb-5">
      <Link href="/"      ><a className={`${navlinkStyles} ${active === 1 ? activeStyles : ""}`}>Home</a></Link>
      <Link href="/about" ><a className={`${navlinkStyles} ${active === 2 ? activeStyles : ""}`}>About me</a></Link>
      <Link href="/search"><a className={`${navlinkStyles} ${active === 3 ? activeStyles : ""}`}>Search</a></Link>
    </div>
  </>;
}

function DarkToggler({ dark, changeMode }) {
  return <>
    <label className="mb-5 flex items-center">
      <input checked={dark} onChange={() => changeMode()} type="checkbox" role="switch" className="hidden peer" />
      <span className="
        h-5 w-8 px-px mr-2 flex items-center rounded-full transition
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

export default function Sidebar({ dark, changeMode, versionInfo, sideLink }) {
  return <>
    <div className="mt-14">
      <Info />
      <Navlink active={sideLink} />
      <div className="md:hidden flex flex-row-reverse">
        <DarkToggler {...{ dark, changeMode }} />
      </div>
      <div className="absolute bottom-4 hidden md:block">
        <DarkToggler {...{ dark, changeMode }} />
        <Footer versionInfo={versionInfo} />
      </div>
    </div>
  </>;
}
