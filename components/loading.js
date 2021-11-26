export default function Loading() {
  // always dark mode
  return <>
    <div className="fixed inset-0 flex flex-col items-center justify-center text-4xl bg-gray-900 text-gray-100">
      <svg height="60" width="60" className="animate-spin">
        <path d="M2 30 A28 28 0 0 1 58 30" className="stroke-current stroke-4 cap-round fill-none" />
      </svg>
      <div className="mt-5">loading…</div>
    </div>
  </>;
}
