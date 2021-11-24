import Head from "next/head";
import Footer from "./footer";
import Sidebar from "./sidebar";

export default function Layout({ dark, changeMode, versionInfo, title, sideLink, children }) {
  return <>
    <Head>
      <title>{title} – joulev's blog</title>
    </Head>
    <div className="
      max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-8 md:px-0
      grid md:grid-cols-3
    ">
      <div className="
        hidden fixed top-0 inset-x-0 px-4 pt-14 bg-gray-200 dark:bg-gray-800
        md:block md:h-screen md:sticky md:inset-y-0 md:mx-8
      ">
        <Sidebar dark={dark} changeMode={changeMode} versionInfo={versionInfo} sideLink={sideLink} />
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
  </>;
}
