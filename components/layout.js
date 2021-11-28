import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "./footer";
import Sidebar from "./sidebar";
import css from "./layout.module.css";

export default function Layout({ dark, changeMode, versionInfo, title, sideLink, children }) {
  const [downEnough, setDownEnough] = useState(false);
  const [navbarShown, setNavbarShown] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const onScroll = () => {
    if (window.scrollY < 30) setDownEnough(false); else setDownEnough(true);
  };
  return <>
    <Head>
      <title>{title} – joulev's blog</title>
    </Head>
    <div className="
      max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-8 md:px-0
      md:grid md:grid-cols-3
    ">
      <div className={`
        fixed top-0 inset-x-0 px-4 z-40 shadow-xl overflow-hidden bg-gray-200 dark:bg-gray-800
        ${navbarShown ? "h-112" : "h-0"} transition-all duration-300 md:transition-none
        md:h-screen md:sticky md:inset-y-0 md:mx-8 md:shadow-none
      `}>
        <Sidebar {...{ dark, changeMode, versionInfo, sideLink }} />
      </div>
      <div className="md:col-span-2 md:mx-8 py-14">
        {children}
      </div>
    </div>
    <div className="bg-gray-200 dark:bg-gray-800">
      <div className="max-w-md sm:max-w-lg md:hidden mx-auto px-8 py-8">
        <Footer versionInfo={versionInfo} />
      </div>
    </div>
    <div className={`fixed top-4 right-4 p-2 z-50 cursor-pointer rounded transition duration-300 border border-solid
      ${downEnough && !navbarShown ? "bg-gray-200 dark:bg-gray-800 border-gray-400 dark:border-gray-600"
                                   : "border-opacity-0"}
      md:hidden`} onClick={() => setNavbarShown(!navbarShown)}>
      <svg width="24" height="24">
        <line x1="0" y1="6" x2="24" y2="6" className={`stroke-current stroke-2 cap-round transition-transform duration-300
          ${navbarShown ? css.togglerFirst : ""}`} />
        <line x1="0" y1="18" x2="24" y2="18" className={`stroke-current stroke-2 cap-round transition-transform duration-300
          ${navbarShown ? css.togglerLast : ""}`} />
      </svg>
    </div>
    <Link href="/" passHref>
      <div className={`fixed top-4 right-16 p-2 z-50 cursor-pointer rounded transition duration-300 border border-solid
        ${downEnough && !navbarShown ? "bg-gray-200 dark:bg-gray-800 border-gray-400 dark:border-gray-600"
                                     : "border-opacity-0"}
        md:hidden`}>
        <svg width="24" height="24">
          <line x1= "6" y1="20" x2="18" y2="20" className="stroke-current stroke-2 cap-round" />
          <line x1= "6" y1="20" x2= "6" y2= "8" className="stroke-current stroke-2 cap-round" />
          <line x1="18" y1="20" x2="18" y2= "8" className="stroke-current stroke-2 cap-round" />
          <line x1="12" y1= "2" x2= "3" y2="11" className="stroke-current stroke-2 cap-round" />
          <line x1="12" y1= "2" x2="21" y2="11" className="stroke-current stroke-2 cap-round" />
          <line x1="18" y1= "8" x2="18" y2= "0" className="stroke-current stroke-3 cap-round" />
        </svg>
      </div>
    </Link>
    <div className={`fixed bottom-6 right-6 p-2 z-50 bg-gray-200 dark:bg-gray-800
      ${downEnough ? "opacity-100 cursor-pointer" : "opacity-0"}
      border border-solid rounded border-gray-400 dark:border-gray-600
    hover:border-gray-500 dark:hover:border-gray-500 transition`}
      onClick={() => {if (downEnough) window.scrollTo({ top: 0, behavior: "smooth" });}}>
      <svg width="24" height="24">
        <line x1="12" y1="2" x2="12" y2="20" className="stroke-current stroke-2 cap-round" />
        <line x1="12" y1="2" x2= "3" y2="11" className="stroke-current stroke-2 cap-round" />
        <line x1="12" y1="2" x2="21" y2="11" className="stroke-current stroke-2 cap-round" />
      </svg>
    </div>
  </>;
}
