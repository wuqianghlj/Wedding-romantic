import Link from 'next/link'

export default function Navbar(){
  return (
    <nav className="w-full bg-white/60 backdrop-blur sticky top-0 z-20">
      <div className="container flex items-center justify-between p-4">
        <Link href="/" className="font-bold">邬强 & 王珂珣</Link>
        <div className="space-x-4">
          <Link href="/story">故事</Link>
          <Link href="/schedule">日程</Link>
          <Link href="/location">地点</Link>
          <Link href="/rsvp">RSVP</Link>
        </div>
      </div>
    </nav>
  )
}
