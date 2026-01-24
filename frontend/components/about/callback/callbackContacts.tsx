"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function CallbackContacts() {
    const items = [
        {
            icon: Phone,
            title: "Телефон",
            content: ["+7 (495) 123-45-67"],
            color: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
            iconBg: "bg-blue-600",
        },
        {
            icon: Mail,
            title: "Email",
            content: ["info@memorial.ru"],
            color: "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200",
            iconBg: "bg-amber-600",
        },
        {
            icon: MapPin,
            title: "Адрес",
            content: ["Москва, ул. Примерная, д. 123"],
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
                    className={`${item.color} border rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300`}
                >
                    <div className="flex items-center gap-4">
                        <div className={`${item.iconBg} w-12 h-12 rounded-xl flex items-center justify-center`}>
                            <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-medium text-neutral-800 mb-1">
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