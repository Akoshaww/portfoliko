"use client";

import React from 'react'

const skills = [
  { name: 'JavaScript', icon: 'icons/javascript.svg' },
  { name: 'HTML', icon: 'icons/html.svg' },
  { name: 'TypeScript', icon: 'icons/typescript.svg' },
  { name: 'Next.js', icon: 'icons/nextjs.svg' },
  { name: 'React', icon: 'icons/react.svg' },
  { name: 'RTK', icon: 'icons/redux.svg' },
  { name: 'Git', icon: 'icons/git.svg' }
]

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-16 mb-70 bg-black overflow-hidden w-full">
      
      {/* Заголовок */}
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <h2 className="text-xs md:text-sm uppercase font-mono tracking-[0.2em] text-neutral-500">
          // Навыки и технологии
        </h2>
      </div>

      {/* Сетка карточек */}
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="h-40 flex flex-col items-center justify-center gap-4 rounded-xl bg-neutral-900/40 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300 select-none cursor-pointer"
            >
              <img 
                src={skill.icon} 
                alt={skill.name} 
                className="w-12 h-12 object-contain filter drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]"
              />
              <span className="text-white font-mono text-xs font-semibold tracking-wide text-center px-1">
                {skill.name}
              </span>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}
