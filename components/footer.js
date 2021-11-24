import moment from "moment";

export default function Footer({ versionInfo }) {
  return <>
    <div className="text-sm text-gray-500">
      <div className="mb-2 xl:mb-0">
        Built with <a href="https://nextjs.org" target="_blank" rel="noreferrer">Next.js</a>{" "}
        and <a href="https://tailwindcss.com" target="_blank" rel="noreferrer">Tailwind&nbsp;CSS</a>.
      </div>
      <div className="mb-2">
        Commit&nbsp;
        <a href={`https://github.com/joulev/blog/commit/${versionInfo.hash}`} target="_blank" rel="noreferrer">
          <code>{versionInfo.hash}</code>
        </a>{" "}
        (<time dateTime={versionInfo.time} title={moment(versionInfo.time).toISOString(false)}>
          {moment(versionInfo.time).format("HH:mm:ss")}&nbsp;{moment(versionInfo.time).format("D/MM/y")}
        </time>)
      </div>
      <div className="grid grid-cols-2">
        <div className="">
          <a href="https://github.com/joulev/blog" target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <div className="">
          <a href="mailto:joulev.vvd@yahoo.com" target="_blank" rel="noreferrer">Email</a>
        </div>
      </div>
    </div>
  </>;
}
