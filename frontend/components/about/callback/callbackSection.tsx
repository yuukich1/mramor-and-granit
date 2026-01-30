"use client";

import { motion } from "framer-motion";
import { CallbackContacts } from "./callbackContacts";
import { CallbackForm } from "./callbackForm";
import { TelegramBlock } from "./tgBlock";

export function CallbackSection() {
    return (
        <section
            id="contact"
            className="py-16 bg-gradient-to-b from-white via-amber-50/20 to-white relative"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 text-amber-700 text-sm font-medium mb-3 px-4 py-2 rounded-full bg-amber-50 border border-amber-200">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        Свяжитесь с нами
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-serif text-neutral-800 mb-4">
                        Готовы обсудить ваш проект?
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        Ответим на все вопросы и поможем с выбором
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start b mb-8">
                    <CallbackForm />
                    <div className="space-y-6">
                        <CallbackContacts />         
                    </div>
                    
                </div>
                <TelegramBlock />
            </div>
        </section>
    );
}