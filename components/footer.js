export default function Footer({ className }) {
  return <>
    <div className={`${className} text-sm text-gray-500`}>
      <div className="mb-2 xl:mb-0">
        Built with <a href="https://nextjs.org" target="_blank" rel="noreferrer">Next.js</a>{" "}
        and <a href="https://tailwindcss.com" target="_blank" rel="noreferrer">Tailwind&nbsp;CSS</a>.
      </div>
      <div className="mb-2">
        Commit&nbsp;
        <a href={`https://github.com/joulev/blog/commit/a1b2c3d`} target="_blank" rel="noreferrer">
          <code>a1b2c3d</code>
        </a> (01/01/21&nbsp;11:12:13)
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
