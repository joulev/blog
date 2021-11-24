import Image from "next/image";

export default function SidebarInfo() {
  return <>
    <div className={`text-center pb-3`}>
      <div>
        <Image src="/avatar.jpg" width={100} height={100} alt="joulev"
          className="rounded-full border-primary-500 border-2 border-solid" />
      </div>
      <div>
        <p className="text-2xl font-bold">Vu Van Dung</p>
        <a href="https://github.com/joulev" target="_blank" rel="noreferrer"
          className="text-gray-500">
          @joulev
        </a>
      </div>
    </div>
  </>;
}
