"use client";

import { motion } from "framer-motion";

export const Greeting = () => {
  return (
    <div className="flex flex-col items-center px-4" key="overview">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-semibold text-lg tracking-tight text-foreground"
        initial={{ opacity: 0, y: 6 }}
        transition={{ delay: 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        What can I help with?
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 text-center text-muted-foreground/70 text-sm"
        initial={{ opacity: 0, y: 6 }}
        transition={{ delay: 0.3, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        Ask about this ticket or anything else.
      </motion.div>
    </div>
  );
};
