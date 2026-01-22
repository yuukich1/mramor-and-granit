"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { NAV_ITEMS } from "../header/nav-items";
import { services } from "./services-items";


export function Footer() {

  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-neutral-300 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-gradient-to-br from-amber-600/10 to-transparent rounded-full blur-3xl -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-4">
              Мрамор и Гранит
            </h3>
            <p className="text-neutral-400 mb-6 max-w-md">
              Создание мемориальных комплексов из натурального камня высочайшего качества. 
              Работаем с 2021 года, гарантия на все изделия.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-white text-lg font-medium mb-4">Навигация</h4>
            <nav className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="block text-neutral-400 hover:text-amber-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-white text-lg font-medium mb-4">Услуги</h4>
            <nav className="space-y-3">
              {services.map((service) => (
                <motion.a
                  key={service}
                  href="#services"
                  className="block text-neutral-400 hover:text-amber-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  {service}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-neutral-700">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 hover:text-amber-400 transition-colors cursor-pointer group">
              <div className="p-2 bg-neutral-800 rounded-lg group-hover:bg-amber-900/30 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">+7 (495) 123-45-67</p>
                <p className="text-sm text-neutral-400">Единый контактный номер</p>
              </div>
            </div>
            <div className="flex items-center gap-3 hover:text-amber-400 transition-colors cursor-pointer group">
              <div className="p-2 bg-neutral-800 rounded-lg group-hover:bg-amber-900/30 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">info@memorial.ru</p>
                <p className="text-sm text-neutral-400">Электронная почта</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="flex items-start gap-3 hover:text-amber-400 transition-colors cursor-pointer group">
              <div className="p-2 bg-neutral-800 rounded-lg group-hover:bg-amber-900/30 transition-colors mt-1">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">г. Самара, ул. ​Александра Матросова, 100​, 1 этаж</p>
                <p className="text-sm text-neutral-400">Основное производство</p>
              </div>
            </div>
            <div className="flex items-center gap-3 hover:text-amber-400 transition-colors cursor-pointer group">
              <div className="p-2 bg-neutral-800 rounded-lg group-hover:bg-amber-900/30 transition-colors">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">Ежедневно: 9:00 - 17:00</p>
                <p className="text-sm text-neutral-400">Суббота и воскресенье выходные</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-neutral-700 mt-8 pt-8 text-center"
        >
          <p className="text-neutral-400">
            &copy; {new Date().getFullYear()} Мрамор и Гранит. Все права защищены.
          </p>
          <p className="text-sm text-neutral-500 mt-2">
            ИНН 631898819569 ОГРН 318631300155071
          </p>
          <p className="text-neutral-500">Предложения не являются публичной офертой. Актуальные цены уточняйте по номеру телефона.</p>
        </motion.div>
      </div>
    </footer>
  );
}