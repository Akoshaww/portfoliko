"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-auto w-full md:mt-10 mt-50 bg-black flex flex-col md:py-20 px-6 md:px-16 overflow-hidden select-none"
    >
      {/* КОНТЕЙНЕР ДЛЯ ТЕКСТА */}
      <div className="flex flex-col font-sans uppercase font-black tracking-tighter leading-[0.82] text-5xl sm:text-7xl md:text-8xl lg:text-[9.5vw] max-w-7xl z-10">

        {/* Первая строка: Яркая белая */}
        <motion.span
          className="text-white inline-block [--y:0px] lg:[--y:30px]"
          initial={{ opacity: 0, y: "var(--y)" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          DEVELOPING
        </motion.span>

        {/* Вторая строка: Глубокий серый (как на твоем референсе) */}
        <motion.span
          initial={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-neutral-900"
        >
          NEXT-GEN
        </motion.span>

        {/* Третья строка: Яркая белая */}
        <motion.span
          initial={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-white"
        >
          EXPERIENCES
        </motion.span>

      </div>

      {/* Минималистичный подзаголовок снизу экрана */}
      <motion.p
        initial={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="my-10 text-xs md:text-sm text-neutral-600 tracking-widest max-w-xs font-mono"
      >
        [ CREATIVE FRONTEND DEVELOPER ]
      </motion.p>
      <div className="w-full h-0.5 md:my-12 mt-12 bg-neutral-500" />
    </section>
  );
}
