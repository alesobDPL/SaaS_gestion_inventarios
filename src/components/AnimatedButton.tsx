"use client";

import Link from "next/link";
import * as motion from "motion/react-client";

interface AnimatedButtonProps {
  href: string;
  text: string;
  color: string;
}

export default function AnimatedButton({ href, text, color }: AnimatedButtonProps) {
  return (
    <motion.div
      className="flex justify-center items-center w-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      whileHover={{ scale: 1.05 }}
    >
      <Link href={href} className="w-full">
        <button
          className={`w-full h-32 px-8 py-4 ${color} text-white rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform ease-in-out text-xl font-semibold flex justify-center items-center`}
        >
          {text}
        </button>
      </Link>
    </motion.div>
  );
}
