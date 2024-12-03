import Link from 'next/link'

export function Logo(props: { size?: string }) {
  return (
    <span
      className={`uppercase font-bold text-black ${props.size}`}
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title="Logo FOOD TRACKER"
    >
      <span className="bg-primary p-1 rounded-md text-white">Food</span> Tracker
    </span>
  )
}
