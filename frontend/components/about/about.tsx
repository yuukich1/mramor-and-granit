"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AboutAdvantages } from "./about-advatages";

export function About() {
  return (
    <section
      id="about"
      className="relative py-20 bg-white overflow-hidden"
    >
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full blur-3xl bg-gradient-to-l from-amber-100/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ">
              <Image
                src="/aboutIMG.jpg"
                alt="О компании"
                fill
                className="object-cover scale-170"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 lg:order-2 space-y-6"
          >
            <h2 className="text-2xl lg:text-3xl font-serif text-neutral-800">
              О компании
            </h2>

            <p className="text-lg text-neutral-600 leading-relaxed">
              Компания «Мрамор и Гранит» специализируется на изготовлении
              мемориальных памятников с 2009 года. За это время мы помогли
              сотням семей увековечить память о своих близких.
            </p>

            <p className="text-neutral-600 leading-relaxed">
              Мы используем только натуральный камень высшего качества и
              современное оборудование. Наши мастера имеют многолетний опыт
              работы и относятся к каждому заказу с уважением и ответственностью.
            </p>

            <AboutAdvantages />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
