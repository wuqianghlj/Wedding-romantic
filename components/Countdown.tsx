'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function Countdown({ targetDate }: { targetDate: Date }) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date()
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }
    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className="flex flex-col items-center text-center p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-2xl md:text-3xl font-serif text-[#704214] mb-4">距离婚礼还有</h2>
      <div className="flex gap-4 text-[#704214] font-bold text-xl md:text-2xl">
        <TimeBox value={timeLeft.days} label="天" />
        <TimeBox value={timeLeft.hours} label="小时" />
        <TimeBox value={timeLeft.minutes} label="分钟" />
        <TimeBox value={timeLeft.seconds} label="秒" />
      </div>
    </motion.div>
  )
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-[#f5eee6] text-[#704214] rounded-xl shadow-md w-16 h-16 md:w-20 md:h-20 flex justify-center items-center text-2xl">
        {value.toString().padStart(2, '0')}
      </div>
      <span className="text-sm mt-2">{label}</span>
    </div>
  )
}
