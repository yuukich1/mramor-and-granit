"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { User, Lock, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loginRequest } from "@/api/auth";
import Cookies from "js-cookie";
import Link from "next/link"; 

export function LoginForm() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const { access_token } = await loginRequest({ username, password });

            if (access_token) {
                Cookies.set("access_token", access_token, { expires: 7, secure: false });
                router.push("/admin");
                router.refresh();
            }
        } catch (err) {
            if (err instanceof AxiosError && err.response?.status === 422) {
                setError("Ошибка валидации данных на сервере");
            } else {
                setError("Неверное имя пользователя или пароль");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-4">
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors group"
                >
                    <div className="p-2 rounded-full bg-white/50 backdrop-blur-sm border border-neutral-200/50 group-hover:bg-white group-hover:shadow-sm transition-all">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    На главную
                </Link>
            </motion.div>

            <Card className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border-neutral-200/50 relative overflow-hidden">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-neutral-800 text-center">
                        Вход в систему
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="username" className="block text-sm font-medium text-neutral-700">
                                Имя пользователя
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-400 transition-all text-neutral-900"
                                    placeholder="Login"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                                Пароль
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-12 py-3 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-400 transition-all text-neutral-900"
                                    placeholder="Password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                                    aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-3 bg-red-50 border border-red-200 rounded-xl overflow-hidden"
                                >
                                    <p className="text-sm text-red-600 text-center">{error}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-6 bg-gradient-to-r from-neutral-700 to-neutral-800 text-white rounded-xl font-medium shadow-lg hover:from-neutral-800 hover:to-neutral-900 transition-all active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "Войти в панель"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}