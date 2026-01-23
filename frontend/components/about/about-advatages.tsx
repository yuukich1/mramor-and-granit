"use client";

import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const ADVANTAGES: readonly string[] = [
  "Собственное производство",
  "Высококачественные материалы",
  "Опытные мастера",
  "Индивидуальный подход",
  "Гибкая система скидок",
  "Гарантия качества",
];

export function AboutAdvantages() {
  return (
    <div className="grid grid-cols-2 gap-4 pt-4">
      {ADVANTAGES.map((item, index) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="flex items-start gap-2"
        >
          <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          <span className="text-neutral-700">
            {item}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
