import * as motion from "motion/react-client";

export default function AnimatedTitle() {
  return (
    <motion.h1 
      className="text-5xl font-extrabold text-gray-900 tracking-tight mb-8 text-center "
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      Gestión de Inventarios
    </motion.h1>
  );
}
