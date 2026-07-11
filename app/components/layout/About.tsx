import { motion } from "framer-motion";
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Model } from '../ui/Globe'
export default function About() {
    return (
        <section className="flex flex-col lg:flex-row h-auto py-10 px-6 md:px-16 items-center justify-center gap-10">

            {/* ЛЕВАЯ ЧАСТЬ: ТЕКСТ */}
            {/* w-full на мобилке, w-1/2 на десктопе. Высота h-auto на мобилке, чтобы текст не обрезался */}
            <motion.div className="overflow-hidden select-none bg-black flex flex-col justify-center gap-4 w-full lg:w-1/2 h-auto ">
                {/* 💻 На ПК анимируется, 📱 на телефонах появляется сразу */}
                <motion.h2
                    initial={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2, once: false }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-[10px] md:text-sm uppercase font-mono tracking-[0.2em] lg:tracking-[0.25em] text-cyan-400 bg-cyan-500/10 px-2.5 py-1 lg:px-3 rounded-full w-fit border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)] mb-4 lg:mb-6"
                >
                    Creative engineering for the modern web
                </motion.h2>

                <motion.p
                    initial={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.2, once: false }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="text-base md:text-xl lg:text-2xl text-neutral-400 font-medium leading-relaxed tracking-tight"
                >
                    Hello, I’m{' '}
                    <span className="font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white via-neutral-200 to-cyan-400 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] lg:drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        AKDIL ASCENDO
                    </span>
                    . I specialize in developing{' '}
                    <span className="text-white font-semibold">performant, pixel-perfect</span> web
                    applications using modern React ecosystems. My architecture is clean, my code
                    is <span className="text-cyan-400 font-mono text-base md:text-lg lg:text-xl inline-block">strongly typed</span>, and my
                    animations are always purposeful. I approach development as a synthesis of
                    technical problem-solving and{' '}
                    <span className="text-white italic underline decoration-cyan-500/50 underline-offset-4">
                        visual storytelling
                    </span>

                </motion.p>

            </motion.div>
         <div className="w-full h-100 relative">
  <Canvas>
    <ambientLight intensity={3.5} />
    <directionalLight position={[5, 5, 5]} intensity={2.5} />
    <directionalLight position={[-5, -3, -5]} intensity={1.5} />
    <Model scale={0.015} position={[0, 0, 0]} />
    <OrbitControls enableZoom={true} autoRotate={true} autoRotateSpeed={0.5} />
  </Canvas>
</div>





        </section>

    );
}