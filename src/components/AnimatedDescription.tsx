"use client";

import { motion } from "motion/react"

interface Props {
textToDisplay: string;

}

export default function AnimatedDescription({textToDisplay}: Props) {
  return (
    <motion.p
      className="text-lg text-gray-700 mb-12 text-center font-medium leading-relaxed"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      {textToDisplay}
    </motion.p>
  );
}



