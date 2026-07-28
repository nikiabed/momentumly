"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const LoginScene = () => {
  return (
    <div className="relative md:w-40 lg:w-80 aspect-square ">
      {/* Sun */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        right-5
        top-5
        w-16
        h-16
        rounded-full
        bg-yellow-300
        opacity-70
        "
      />

      {/* Plant */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        bottom-5
        left-1/2
        -translate-x-1/2
        "
      >
        <Image src="/images/plant0.png" width={160} height={160} alt="plant" />
      </motion.div>

      {/* Sparkles */}
      <motion.div
        animate={{
          opacity: [0.3, 1, 0.3],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="
        absolute
        left-10
        top-24
        text-yellow-400
        "
      >
        ✨
      </motion.div>
    </div>
  );
};
