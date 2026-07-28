"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const LoginScene = () => {
  return (
    <div
      className="relative  aspect-square overflow-hidden
w-[320px]
h-105"
    >
      {/* moon */}
      <motion.div
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="
        absolute
        right-8
        top-8
        w-12
        h-12
        rounded-full
        bg-yellow-200/60
shadow-[0_0_40px_rgba(253,224,71,0.5)]
        blur-[1px]
        "
      />

      {/* tree */}
      <motion.div
        animate={{
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        bottom-5
        left-1/2
        -translate-x-1/2
        origin-bottom
         w-full
 h-auto
 opacity-80
        "
      >
        <Image
          src="/images/tree-p.png"
          width={500}
          height={600}
          alt="tree"
          className="opacity-90
brightness-75
sepia
hue-rotate-15"
        />
      </motion.div>

      {/* falling leaves */}
      <motion.div
        className="
  absolute
  left-20
  top-40
  w-1.5
  h-1.5
  rounded-full
  bg-yellow-200
  shadow-[0_0_10px_rgba(253,224,71,0.8)]
  "
        animate={{
          x: [0, 20, -10, 0],
          y: [0, 30, 60],
          opacity: [1, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
