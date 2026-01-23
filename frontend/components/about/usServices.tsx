"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SERVICES_ABOUT } from "./serv-items-about";

export function UsServices() {
  return (
    <section
      id="services"
      className="relative py-20 overflow-hidden bg-white"
        // bg-gradient-to-br from-neutral-50 via-amber-50/30 to-neutral-50
    >
      {/* <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-transparent rounded-full blur-3xl" /> */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-serif text-neutral-800 mb-4">
            Наши услуги
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Полный спектр услуг от разработки дизайна до установки памятника
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_ABOUT.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="relative h-full bg-white border-neutral-200 shadow-md">
                <CardHeader>
                  <div
                    className={`w-14 h-14 mb-4 rounded-2xl
                      bg-gradient-to-br ${service.color}
                      flex items-center justify-center shadow`}
                  >
                    <service.icon className="w-7 h-7 text-white" />
                  </div>

                  <CardTitle className="text-xl font-serif text-neutral-800">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-neutral-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 rounded-2xl border border-neutral-200
            bg-gradient-to-br from-white to-amber-50/50 p-8 shadow-xl"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Stat label="Гарантия на материалы" value="10 лет" />
            <Stat label="Срок изготовления" value="от 14 дней" />
            <Stat label="Бесплатная консультация" value="24/7" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="cursor-default">
      <div className="text-neutral-800 text-lg mb-2">{label}</div>
      <div className="text-4xl font-serif bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
        {value}
      </div>
    </div>
  );
}
