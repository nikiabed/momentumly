"use client";

import { motion } from "framer-motion";

export const HeroMotionBackground = () => {
  const streaks = [
    { top: "-10%", duration: 35, delay: 0 },
    { top: "10%", duration: 45, delay: 3 },
    { top: "30%", duration: 30, delay: 7 },
    { top: "50%", duration: 55, delay: 1 },
    { top: "70%", duration: 40, delay: 5 },
    { top: "90%", duration: 60, delay: 10 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {streaks.map((item, index) => (
        <motion.div
          key={index}
          className="
            absolute
            h-20
            w-[180%]
            rotate-35
            bg-foreground/[0.035]
          "
          style={{
            top: item.top,
            right: "-180%",
          }}
          animate={{
            x: ["0%", "-220%"],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};
