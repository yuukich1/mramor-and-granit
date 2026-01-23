"use client";
import { motion } from "framer-motion";

export function MapSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-neutral-200"
    >
      <div className="w-full h-full animate-pulse bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200" />
    </motion.div>
  );
}
