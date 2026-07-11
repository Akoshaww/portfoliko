'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/layout/PreLoader';
import Navbar, { NavBody, NavItems, NavbarButton, } from './components/layout/Navbar';
import Hero from './components/layout/Hero';
import About from './components/layout/About';
import SkillsSection from './components/layout/Skills';

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.overflowX = 'hidden';
    }

  }, [isLoading]);




  // Список ссылок для твоего портфолио
  const links = [
    { name: 'Главная', link: '#hero' },
    { name: 'Обо мне', link: '#about' },
    { name: 'Скиллы', link: '#skills' },
    { name: 'Проекты', link: '#projects' },
    { name: 'Мир', link: '#world' },
  ];
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>


      <div className="relative min-h-screen h-auto bg-black text-white">
        


          <Navbar className="fixed top-0 left-0 w-full px-4 md:px-0">

            {/* 💻 ДЕСКТОП: Панель Aceternity */}
            <NavBody>
              <div className="font-bold text-white tracking-widest text-sm z-20">
                AKDIL ASCENDO
              </div>
              <NavItems items={links} />
              <div className="z-20 flex flex-row items-center space-x-2">
                <NavbarButton variant="dark" href="#world">
                  Связаться
                </NavbarButton>
                <button
                  onClick={() => setIsVisible(!isVisible)}
                  className="lg:hidden p-2 text-white bg-neutral-900 border border-neutral-800 rounded-full text-xs"
                >
                  {isVisible ? 'Закрыть' : 'Меню'}
                </button>
              </div>
            </NavBody>

            {isVisible && (<div className="lg:hidden fixed top-4 inset-x-4 h-12 flex items-center justify-between px-5 bg-neutral-950/60 backdrop-blur-xl border border-neutral-800/40 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)]">

              <div className="font-bold text-white tracking-widest text-xs uppercase">
                AKDIL ASCENDO
              </div>
              <div className="text-[9px] text-neutral-400 tracking-wider font-mono uppercase bg-neutral-900/90 px-3 py-1 rounded-full border border-neutral-800/60">
                PORTFOLIO '26
              </div>
            </div>)
            }
          </Navbar>
          <Hero />
          <About />
          <SkillsSection />

        </div>

      

    </>
  );
}
