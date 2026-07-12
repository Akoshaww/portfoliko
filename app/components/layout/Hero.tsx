"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-auto w-full md:mt-24 mt-40 flex flex-col justify-center px-6 md:px-16 overflow-hidden select-none"
    >
      {/* ДИЗАЙНЕРСКИЙ НЕОНОВЫЙ БЭКГРАУНД-БЛИК (Мягкое свечение позади текста) */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-cyan-500/10 rounded-full blur-[80px] md:blur-[150px] pointer-events-none z-0" />

      {/* КОНТЕЙНЕР ДЛЯ ТЕКСТА */}
      <div className="flex flex-col font-sans uppercase font-black tracking-tighter leading-[0.82] text-5xl sm:text-7xl md:text-8xl lg:text-[9.5vw] max-w-7xl z-10">

        {/* Первая строка: Чистый белый с легким объемом */}
        <motion.span
          className="text-white inline-block drop-shadow-[0_4px_12px_rgba(255,255,255,0.1)]"
          initial={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          DEVELOPING
        </motion.span>

        {/* Вторая строка: НЕОНОВЫЙ ГРАДИЕНТ (Вместо скучного серого) */}
        <motion.span
          initial={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.35)] py-1"
        >
          NEXT-GEN
        </motion.span>

        {/* Третья строка: Белый со свечением */}
        <motion.span
          initial={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-white inline-block drop-shadow-[0_4px_12px_rgba(255,255,255,0.1)]"
        >
          EXPERIENCES
        </motion.span>

      </div>

      
  

      
      <div className="w-full h-[1px] bg-gradient-to-r my-25 from-cyan-500/50 via-neutral-800 to-transparent shadow-[0_1px_10px_rgba(6,182,212,0.2)]" />
    </section>
  );
}
