import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { LoginForm } from "@/components/login/loginForm";


export const metadata: Metadata = {
    title: "Вход в систему",
    description: "Панель управления сайтом Мрамор и Гранит",
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-neutral-300/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neutral-300/20 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md px-6">
                <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg mb-4">
                        <Lock className="w-12 h-12 text-neutral-700" />
                    </div>
                    <h1 className="text-3xl font-bold text-neutral-800 mb-2">Мрамор и Гранит</h1>
                    <p className="text-neutral-600">Панель администратора</p>
                </div>

                <LoginForm />
            </div>
        </div>
    );
}