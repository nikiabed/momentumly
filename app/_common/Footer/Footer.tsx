"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  duration: number;
  size: number;
  isStar: boolean;
  icon?: string;
};

export const Footer = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const starIcons = ["✦", "✧", "✨"];

  useEffect(() => {
    setParticles(
      Array.from({ length: 45 }, (_, i) => {
        const isStar = Math.random() < 0.08;
        return {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          duration: Math.random() * 4 + 3,
          size: isStar ? Math.random() * 2 + 10 : Math.random() * 2 + 1.5,
          isStar,
          icon: isStar
            ? starIcons[Math.floor(Math.random() * starIcons.length)]
            : undefined,
        };
      }),
    );
  }, []);

  return (
    <footer
      className="
    relative
    overflow-hidden
    border-t
    border-foreground/10
    px-6
    py-8
          bg-[#272567]
          text-rose-50

  "
    >
      {/* background glow */}
      <div
        className="
      absolute
      right-0
      top-0
      w-28
      rounded-full
      blur-3xl
    "
      />

      {/* floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="pointer-events-none absolute select-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -8, 0],
            x: [0, 2, -2, 0],
            opacity: [0.2, 0.9, 0.2],
            scale: [1, 1.2, 1],
            rotate: p.isStar ? [0, 20, -20, 0] : 0,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.isStar ? (
            <span
              style={{ fontSize: p.size }}
              className="text-yellow-200 drop-shadow-[0_0_8px_rgba(255,230,120,0.7)]"
            >
              {p.icon}
            </span>
          ) : (
            <div
              style={{
                width: p.size,
                height: p.size,
              }}
              className="rounded-full bg-white/40 blur-[0.5px]"
            />
          )}
        </motion.div>
      ))}

      <div
        className="
      relative
      mx-auto
      flex
      max-w-300
      flex-col
      items-center
      justify-between
      gap-4
      text-center
      md:flex-row
      md:text-right
      
    "
      >
        <div>
          <Image
            src={"/images/Logo-w.png"}
            alt="logo momentumly"
            width={130}
            height={60}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-5 text-xs ">
          <a href="#" className="transition hover:text-white">
            حریم خصوصی
          </a>
          <a href="#" className="transition hover:text-white">
            شرایط استفاده
          </a>
          <span dir="ltr">© 2026 momentumly</span>{" "}
        </div>

        <p className="text-xs ">ساخته‌شده توسط : Nikiabed </p>
      </div>
    </footer>
  );
};
