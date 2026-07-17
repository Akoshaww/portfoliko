'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconX, IconBrandTelegram, IconArrowUpRight } from '@tabler/icons-react';
import Preloader from './components/layout/PreLoader';
import Navbar, { NavBody, NavItems, NavbarButton } from './components/layout/Navbar';
import Hero from './components/layout/Hero';
import About from './components/layout/About';
import SkillsSection from './components/layout/Skills';
import Component from './components/ui/GridHero';
import Projects from "./components/layout/Projects";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.overflowX = 'hidden';
    }
  }, [isLoading]);

  const gridColor = "#06b6d4";
  const showScanlines = true;
  const glowEffect = true;

  const links = [
    { name: 'Main', link: '#hero' },
    { name: 'About me', link: '#about' },
    { name: 'Skills', link: '#skills' },
    { name: 'Projects', link: '#projects' },
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">

        <Component
          gridColor={gridColor}
          showScanlines={showScanlines}
          glowEffect={glowEffect}
          className="fixed inset-0 w-full h-full z-0 pointer-events-none"
        />

        <Navbar className="fixed top-0 left-0 w-full px-4 md:px-0 z-50">
          <NavBody>
            <div className="font-bold text-white tracking-widest text-sm z-20">
              AKDIL ASCENDO
            </div>
            <NavItems items={links} />
            <div className="z-20 flex flex-row items-center space-x-2">
              <NavbarButton variant="gradient" onClick={() => setIsModalOpen(true)}>
                Contact
              </NavbarButton>

              <button
                onClick={() => setIsModalOpen(true)}
                className="lg:hidden p-2 text-white bg-neutral-900 border border-neutral-800 rounded-full text-xs"
              >
                Contact
              </button>
            </div>
          </NavBody>

          {isVisible && (
            <div className="lg:hidden fixed top-4 inset-x-4 h-12 flex items-center justify-between px-5 bg-neutral-950/60 backdrop-blur-xl border border-neutral-800/40 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              <div className="font-bold text-white tracking-widest text-xs uppercase">
                AKDIL ASCENDO
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-[10px] text-cyan-400 font-bold tracking-wider font-mono uppercase bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              >
                 Contact
              </button>
            </div>
          )}
        </Navbar>

        <div className="relative z-10 w-full gap-10 px-6 flex flex-col">
          <div id="hero">
            <Hero />
          </div>

          <div id="about">
            <About />
          </div>

          <div id="skills">
            <SkillsSection />
          </div>

          <div id="projects">
            <Projects />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-cyan-500/20 bg-neutral-950 p-8 text-center shadow-[0_0_50px_rgba(6,182,212,0.2)] z-10"
            >
              <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-cyan-500/10 blur-2xl" />
              <div className="absolute -right-10 -bottom-10 h-28 w-28 rounded-full bg-blue-500/10 blur-2xl" />

              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 rounded-full border border-neutral-800 bg-neutral-900 p-1.5 text-neutral-400 transition-colors hover:border-cyan-500/40 hover:text-cyan-400"
              >
                <IconX className="h-4 w-4" />
              </button>

              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                <IconBrandTelegram className="h-7 w-7" />
              </div>

              <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                Let's Connect
              </h3>
              <p className="mt-2 text-xs font-mono text-neutral-400 leading-relaxed">
                Have a great project idea, a job proposal, or just want to chat? Send me a message on Telegram!
              </p>

              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all hover:scale-[1.02] active:scale-95"
              >
                open Telegram <IconArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </>
  );
}