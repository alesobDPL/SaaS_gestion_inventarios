"use client";
import { motion } from "motion/react"

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export default function AnimatedText({ text, className }: AnimatedTextProps) {
  return (
    <motion.h1
      className={`text-5xl font-extrabold ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {text}
    </motion.h1>
  );
}
