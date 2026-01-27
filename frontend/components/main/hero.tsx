"use client";

import { motion } from "framer-motion";
import { ArrowDown, Award, Sparkles, Users } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/placeholder.png"
          alt="Мемориальные памятники"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-400/30 px-5 py-2 text-sm text-amber-200 mb-6 backdrop-blur"
          >
            <Sparkles className="w-4 h-4" />
            Более 5 лет сохраняем память
          </motion.div>

          <motion.h1
            variants={item}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6"
          >
            Мемориальные памятники{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
              высокого качества
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg sm:text-xl text-neutral-200 max-w-2xl mb-10"
          >
            Изготавливаем памятники из натурального гранита и мрамора.
            Индивидуальный подход и гарантия качества 10 лет.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 mb-14"
          >
            <Button size="lg" className="px-8">
              <a href="#catalog">
                Смотреть каталог →
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/40 text-black hover:bg-white/20 hover:text-white"
            >
              <a href="#contact">
                Связаться с нами
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="grid grid-cols-3 gap-3 max-w-md"
          >
            <Stat icon={<Award />} value="15+" label="Лет опыта" />
            <Stat icon={<Users />} value="100+" label="Работ" />
            <Stat icon={<Sparkles />} value="100%" label="Гарантия" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-sm">Прокрутите вниз</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-1">
        <div className="h-10 w-10 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
          {icon}
        </div>
        <div className="font-serif text-3xl text-white">
          {value}
        </div>
      </div>
      <div className="text-sm text-neutral-300">{label}</div>
    </div>
  );
}
