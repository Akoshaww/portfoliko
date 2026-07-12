"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion"; // Исправлен импорт на стандартный framer-motion

import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Навбар реагирует на скролл чуть раньше для плавного перехода
    if (latest > 50) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // Исправлено на fixed top-0 для бесшовного закрепления на экране
      className={cn("fixed inset-x-0 top-0 z-50 w-full pt-4", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
            child as React.ReactElement<{ visible?: boolean }>,
            { visible },
          )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(12px)" : "blur(4px)",
        boxShadow: visible
          ? "0 0 20px rgba(6, 182, 212, 0.15), 0 0 0 1px rgba(6, 182, 212, 0.2)"
          : "0 0 0 1px rgba(255, 255, 255, 0.05)",
        width: visible ? "50%" : "100%",
        y: visible ? 10 : 0,
        backgroundColor: visible ? "rgba(10, 10, 10, 0.75)" : "rgba(0, 0, 0, 0.2)",
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 30,
      }}
      style={{
        minWidth: visible ? "700px" : "100%",
      }}
      className={cn(
        "relative z-50 mx-auto hidden flex-row items-center justify-between rounded-full px-6 py-2.5 lg:flex border border-transparent transition-all duration-300 max-w-7xl",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 font-mono text-xs tracking-wider uppercase text-neutral-400 hover:text-cyan-400 transition-colors duration-200"
          key={`link-${item.name}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(12px)" : "blur(6px)",
        boxShadow: visible
          ? "0 0 20px rgba(6, 182, 212, 0.15), 0 0 0 1px rgba(6, 182, 212, 0.2)"
          : "0 0 0 1px rgba(255, 255, 255, 0.05)",
        width: visible ? "92%" : "100%",
        borderRadius: visible ? "9999px" : "0px",
        y: visible ? 10 : 0,
        backgroundColor: visible ? "rgba(10, 10, 10, 0.8)" : "rgba(0, 0, 0, 0.4)",
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 30,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full flex-col items-center justify-between px-6 py-3 lg:hidden max-w-[calc(100vw-2rem)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-2xl bg-neutral-950/95 backdrop-blur-xl px-6 py-6 border border-cyan-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.1)]",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-white hover:text-cyan-400 transition-colors cursor-pointer" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-white hover:text-cyan-400 transition-colors cursor-pointer" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-50 mr-4 flex items-center space-x-2 px-1 py-1 group"
    >
      {/* Кастомная минималистичная неоновая иконка в виде шеврона/буквы А */}
      <div className="w-6 h-6 flex items-center justify-center relative">
        <span className="text-cyan-400 font-black text-lg tracking-tighter group-hover:scale-110 transition-transform duration-200">/\</span>
        <div className="absolute inset-0 bg-cyan-400/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <span className="font-bold text-xs uppercase tracking-[0.2em] text-white group-hover:text-cyan-400 transition-colors">
        AKDIL
      </span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
    | React.ComponentPropsWithoutRef<"a">
    | React.ComponentPropsWithoutRef<"button">
  )) => {
  const baseStyles =
    "px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase relative cursor-pointer active:scale-95 transition-all duration-200 inline-block text-center border";

  const variantStyles = {
    primary:
      "bg-neutral-900 text-white border-neutral-800 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]",
    secondary: 
      "bg-transparent border-transparent text-neutral-400 hover:text-white shadow-none",
    dark: 
      "bg-black text-white border-neutral-800 hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]",
    // Шикарный неоновый градиент для кнопки "Связаться"
    gradient:
      "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:-translate-y-0.5",
  };
  const Component = Tag as any;
  return (
    <Component
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Navbar;

