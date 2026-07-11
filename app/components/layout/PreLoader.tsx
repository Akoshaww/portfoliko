'use client'

import { motion } from "framer-motion";
import { Variants } from "framer-motion";
interface PreLoaderProps {
    onComplete: () => void;
}

export default function PreLoader({ onComplete }: PreLoaderProps) {
    const name = "Akdil Ascendo";
    const letters = name.split("");

    const containerVariants: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const letterVariants: Variants = {
        hidden: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.215, 0.610, 0.355, 1.000]
            },
        },
    }

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black select-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
                y: '-100%',
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
            }}
            onAnimationComplete={onComplete}
        >
            {/* Контейнер для букв */}
            <motion.div
                className="flex overflow-hidden px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {letters.map((letter: string, index: number) => (
                    <motion.span
                        key={index}
                        variants={letterVariants}
                        className="text-5xl md:text-8xl font-extrabold tracking-wider text-white inline-block"
                    >
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                ))}
            </motion.div>


            <div className="w-32 md:w-48 h-px bg-neutral-800 mt-6 relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
            </div>
        </motion.div>
    );


}