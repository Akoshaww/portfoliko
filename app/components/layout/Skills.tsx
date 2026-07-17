"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface Skill {
    name: string;
    icon: string;
}

const skills: Skill[] = [
    { name: 'JavaScript', icon: 'icons/javascript.svg' },
    { name: 'HTML', icon: 'icons/html.svg' },
    { name: 'TypeScript', icon: 'icons/typescript.svg' },
    { name: 'Next.js', icon: 'icons/nextjs.svg' },
    { name: 'React', icon: 'icons/react.svg' },
    { name: 'RTK', icon: 'icons/redux.svg' },
    { name: 'Git', icon: 'icons/git.svg' },
    { name: 'Tailwind', icon: 'icons/tailwind.svg' },
];

const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

export default function SkillsSection() {
    return (
        <section id="skills" className="relative py-20 px-6 overflow-hidden w-full select-none">

            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

            <div className="max-w-6xl mx-auto px-6 mb-12 z-10 relative">
                <div className="flex flex-col gap-1 w-fit">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-cyan-400 uppercase">
                        // TECH STACK
                    </span>
                    <h2 className="text-xl md:text-2xl font-black tracking-tight text-white uppercase">
                        MY SKILLS
                    </h2>
                    <div className="w-full h-[2px] bg-cyan-500 mt-2 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                </div>
            </div>

            <div className="w-full max-w-6xl mx-auto px-6 z-10 relative">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4"
                >
                    {skills.map((skill) => (
                        <motion.div
                            key={skill.name}
                            variants={cardVariants}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="group h-40 flex flex-col items-center justify-center gap-4 rounded-xl bg-neutral-900/30 backdrop-blur-xs border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.05)] hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] focus:border-cyan-400 focus:shadow-[0_0_25px_rgba(6,182,212,0.35)] active:border-cyan-400 active:shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all duration-300 cursor-pointer"
                        >
                            <div className="relative w-12 h-12 flex items-center justify-center">
                                <img
                                    src={skill.icon}
                                    alt={skill.name}
                                    className="w-12 h-12 object-contain filter drop-shadow-[0_0_8px_rgba(6,182,212,0.2)] group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.6)] group-active:scale-105 transition-all duration-300"
                                />
                            </div>

                            <span className="text-neutral-400 group-hover:text-white font-mono text-xs font-semibold tracking-wide text-center px-1 transition-colors duration-300">
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
