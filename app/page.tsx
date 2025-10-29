'use client';
// @ts-nocheck

import { motion } from 'framer-motion';
import Countdown from '@/components/Countdown';

export default function Home() {
  const weddingDate = new Date('2025-11-30T12:00:00');

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#f9f9f7]">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-serif text-[#704214] mb-8"
      >
        邬强 ❤️ 王珂珣 的婚礼
      </motion.h1>
      <Countdown targetDate={weddingDate} />
    </main>
  );
}
