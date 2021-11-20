import moment from "moment";

export default function Footer({ versionInfo, className }) {
  return (
    <div className={`${className} small text-muted`}>
      <div className="mb-2 mb-lg-0">
        Built with <a href="https://nextjs.org" target="_blank" rel="noreferrer">Next.js</a>{" "}
        and <a href="https://getbootstrap.com" target="_blank" rel="noreferrer">Bootstrap</a>.
      </div>
      <div>
        Commit&nbsp;<code className="text-muted">{versionInfo.hash}</code>{" "}
        (<time dateTime={versionInfo.time} title={moment(versionInfo.time).toISOString(false)}>
          {moment(versionInfo.time).format("HH:mm:ss")}&nbsp;{moment(versionInfo.time).format("D/MM/y")}
        </time>)
      </div>
      <div className="row mt-2 gx-0">
        <div className="col-6">
          <a href="https://github.com/joulev/blog">GitHub</a>
        </div>
        <div className="col-6">
          <a href="mailto:joulev.vvd@yahoo.com">Email</a>
        </div>
      </div>
    </div>
  );
}