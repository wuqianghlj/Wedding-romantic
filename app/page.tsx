'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Countdown from '@/components/Countdown'

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const fpRef = useRef<any>(null)

  // ✅ 婚礼日期传给 Countdown 组件
  const weddingDate = new Date('2025-11-30T11:38:00')

  // ✅ fullpage 初始化
  useEffect(() => {
    let fpInstance: any = null

    async function initFullpage() {
      if (typeof window === 'undefined') return
      const fullpage = (await import('fullpage.js')).default

      // 避免重复初始化
      if (document.querySelector('.fp-enabled')) return

      fpInstance = new fullpage('#fullpage', {
        autoScrolling: true,
        scrollHorizontally: true,
        navigation: true,
        navigationPosition: 'right',
        scrollingSpeed: 800,
        anchors: ['home', 'story', 'schedule', 'location', 'rsvp'],
        navigationTooltips: ['首页', '故事', '日程', '地点', 'RSVP'],
        showActiveTooltip: true,
        responsiveWidth: 768,
        licenseKey: 'gplv3-license', // ✅ 修复licenseKey警告
        onLeave: function (_origin: any, destination: any) {
          setActiveSection(destination.index)
        },
      })
      fpRef.current = fpInstance
    }

    initFullpage()

    return () => {
      if (fpInstance && fpInstance.destroy) {
        fpInstance.destroy('all')
      }
    }
  }, [])

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeOut' },
    },
  }

  const backgrounds = [
    'linear-gradient(to bottom, #fff7f9, #fdecef)',
    '#fffaf5',
    '#fdf3e7',
    '#f7f9f8',
    '#fffaf0',
  ]

  return (
    <motion.div
      id="fullpage-wrapper"
      animate={{ background: backgrounds[activeSection] }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="min-h-screen w-full transition-all duration-1000"
    >
      <div id="fullpage">
        {/* 首页 */}
        <div className="section flex flex-col justify-center items-center text-center px-6">
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-4 text-gray-800"
          >
            邬强 ❤️ 王珂珣
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xl md:text-2xl mb-8 text-gray-700"
          >
            我们的婚礼即将开始
          </motion.p>

          {/* ✅ 使用 Countdown 组件 */}
          <Countdown targetDate={weddingDate} />

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm text-gray-500 mt-8"
          >
            滑动或下翻查看更多内容
          </motion.p>
        </div>

        {/* 故事 */}
        <div className="section flex flex-col justify-center items-center text-center px-6">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="text-4xl font-semibold mb-6 text-gray-800"
          >
            我们的故事
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="max-w-2xl text-lg leading-relaxed text-gray-700"
          >
            我们相遇于那个夏天，一次偶然的相识，变成了命中注定的牵手。
            从相知、相伴到相守，点滴的温柔都化作今天最美的时光。
          </motion.p>
        </div>

        {/* 日程 */}
        <div className="section flex flex-col justify-center items-center text-center px-6">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="text-4xl font-semibold mb-6 text-gray-800"
          >
            婚礼日程
          </motion.h2>
          <motion.ul
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="text-lg text-gray-700 leading-loose"
          >
            <li>11:00 — 来宾签到</li>
            <li>11:38 — 婚礼仪式</li>
            <li>12:30 — 午宴（北舞渡）</li>
            <li>15:00 — 石漫滩、二郎山游玩</li>
          </motion.ul>
        </div>

        {/* 地点 */}
        <div className="section flex flex-col justify-center items-center text-center px-6">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="text-4xl font-semibold mb-6 text-gray-800"
          >
            婚礼地点
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="text-lg text-gray-700 mb-6"
          >
            河南省舞钢市迎宾馆
          </motion.p>
          <motion.iframe
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            title="wedding-map"
            className="w-11/12 md:w-2/3 h-80 rounded-2xl shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3084.73521809477!2d113.512!3d33.299"
            loading="lazy"
          ></motion.iframe>
        </div>

        {/* RSVP */}
        <div className="section flex flex-col justify-center items-center text-center px-6">
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="text-4xl font-semibold mb-6 text-gray-800"
          >
            RSVP
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="text-lg text-gray-700 mb-8"
          >
            请填写出席信息或留言祝福 💌
          </motion.p>
          <motion.a
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            href="/rsvp"
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full text-lg transition-all duration-300"
          >
            前往 RSVP 表单
          </motion.a>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="mt-10 text-sm text-gray-500"
          >
            © 2025 邬强 & 王珂珣 • 欢迎来宾
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
