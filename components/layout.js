import Lipsum from "./lipsum";
import Sidebar from "./sidebar";

export default function Layout() {
  return <>
    <div className="
      max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-8 md:px-0
      grid md:grid-cols-3
    ">
      <div className="
        px-4 pt-10 bg-gray-200 dark:bg-gray-800
        fixed top-0 inset-x-0
        md:h-screen md:sticky md:inset-y-0
      ">
        <Sidebar />
      </div>
      <div className="
        md:col-span-2 md:px-8 py-10
      ">
        <Lipsum long />
      </div>
    </div>
    <div className="bg-gray-200 dark:bg-gray-800">
      <div className="max-w-md sm:max-w-lg md:hidden mx-auto px-8">
        Hello world
      </div>
    </div>
  </>;
}

// text-purple-600 sm:text-red-600 md:text-yellow-600 lg:text-green-600 xl:text-blue-600
