"use client";

import * as motion from "motion/react-client";

export default function AnimatedDescription() {
  return (
    <motion.p
      className="text-lg text-gray-700 mb-12 text-center font-medium leading-relaxed"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      Administra tus productos, proveedores y pedidos de forma eficiente y profesional. 
      Simplifica tu flujo de trabajo con herramientas intuitivas y un diseño limpio.
    </motion.p>
  );
}
