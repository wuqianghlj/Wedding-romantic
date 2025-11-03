import './globals.css'

export const metadata = {
  title: '邬强 ❤️ 王珂珣 婚礼邀请',
  description: '浪漫婚礼邀请 - 2025年11月30日11:38',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Noto+Serif+SC:wght@400;600&family=Noto+Sans+SC:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
