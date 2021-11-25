import Image from "next/image";

export default function SidebarInfo() {
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
