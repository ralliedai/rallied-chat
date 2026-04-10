"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export const Greeting = () => {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("ticketId");
  const psaType = searchParams.get("psaType");

  if (ticketId && psaType) {
    const psaLabel = psaType === "connectwise" ? "ConnectWise" : "HaloPSA";
    return (
      <div className="flex flex-col items-center px-4" key="ticket-greeting">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="text-center font-semibold text-2xl tracking-tight text-foreground md:text-3xl"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Ticket #{ticketId}
        </motion.div>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-center text-muted-foreground/80 text-sm"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {psaLabel} ticket loaded. Ask me to diagnose, investigate, or take action.
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-4" key="overview">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-semibold text-2xl tracking-tight text-foreground md:text-3xl"
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.35, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        What can I help with?
      </motion.div>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mt-3 text-center text-muted-foreground/80 text-sm"
        initial={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        Ask a question or paste a ticket ID to get started.
      </motion.div>
    </div>
  );
};
