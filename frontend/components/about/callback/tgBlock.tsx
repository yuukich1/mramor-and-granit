"use client";

import { Send } from "lucide-react";

const TelegramIcon = () => (
    <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
    >
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.68c.223-.198-.054-.308-.346-.11l-6.4 4.03-2.76-.918c-.6-.187-.612-.6.125-.89l10.782-4.156c.5-.18.943.12.78.89z"/>
    </svg>
);

export function TelegramBlock() {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 border border-blue-700 rounded-xl p-5 shadow-lg w-max-7xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <TelegramIcon />
                    </div>
                    <div>
                        <h3 className="text-lg font-serif">Напишите в Telegram</h3>
                        <p className="text-blue-100 text-sm">
                            Быстро ответим на ваши вопросы
                        </p>
                    </div>
                </div>
                <button
                    className="bg-white text-blue-600 hover:bg-blue-50 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
                    onClick={() => window.open("https://t.me/mig_ritual", "_blank")}
                >
                    <Send className="w-4 h-4" />
                    Открыть
                </button>
            </div>
        </div>
    );
}