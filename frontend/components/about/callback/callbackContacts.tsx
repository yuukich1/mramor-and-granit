"use client";

import { MapPin, Phone, Clock } from "lucide-react";

export function CallbackContacts() {
    const items = [
        {
            icon: Phone,
            title: "Телефон",
            content: ["+7 (927) 766-09-33"],
            color: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
            iconBg: "bg-blue-600",
        },
        {
            icon: Phone,
            title: "Телефон",
            content: ["+7 (937) 989-01-53"],
            color: "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200",
            iconBg: "bg-amber-600",
        },
        {
            icon: MapPin,
            title: "Адрес",
            content: ["Село Черноречье, ул. Нижние Пески, 12/2"],
            color: "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200",
            iconBg: "bg-emerald-600",
        },
        {
            icon: Clock,
            title: "Время работы",
            content: ["Ежедневно 9:00 – 18:00"],
            color: "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
            iconBg: "bg-purple-600",
        },
    ];

    return (
        <div className="grid sm:grid-cols-2 gap-4">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`${item.color} border rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center`}
                >
                    <div className="flex flex-col items-center gap-4">
                        <div className={`${item.iconBg} w-14 h-14 rounded-xl flex items-center justify-center`}>
                            <item.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-medium text-neutral-800">
                                {item.title}
                            </h3>
                            {item.content.map((text, idx) => (
                                <p key={idx} className="text-neutral-600 text-sm">
                                    {text}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}