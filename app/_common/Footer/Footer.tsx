"use client";

import { motion } from "framer-motion";
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

  const colors = ["bg-white/80", "bg-sky-300/70", "bg-violet-300/70"];
  return (
    <footer
      className="
      h-15
         relative
    overflow-hidden
      p-2
      bg-gradient-to-br
from-[#020617]
via-[#312E81]
to-[#7E22CE]
      flex
      items-center
      justify-center
      w-full
       z-10 text-center text-white   gap-2
      "
    >
      <div
        className="
absolute
-left-10
bottom-0
w-32
h-32
rounded-full
bg-yellow-300/10
blur-3xl
"
      />

      <div
        className="
absolute
right-0
top-0
w-28
h-28
rounded-full
bg-violet-300/10
blur-3xl
"
      />
      {/* floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute pointer-events-none select-none"
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
              className="
rounded-full
bg-white/40
blur-[0.5px]
"
            />
          )}
        </motion.div>
      ))}
      <div className="relative z-20 flex items-center gap-2">
        <p
          className="
        text-sm
        "
        >
          .Crafted with care
        </p>
        <p
          className="
        "
        >
          | Small steps, Big growth |
        </p>

        <p
          className="
          text-lg
          font-black
          "
        >
          Niki Studio
        </p>
      </div>
    </footer>
  );
};
