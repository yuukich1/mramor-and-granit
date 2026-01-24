"use client";

import { useState } from "react";

import { CallbackScheme } from "@/schemes/callback.schema";
import { useCallbackForm } from "@/hooks/useCallbackForm";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, Send, Loader2 } from "lucide-react";

type Errors = Partial<Record<"fullname" | "phone" | "message", string>>;

export function CallbackForm() {
    const { submit, loading, success, error } = useCallbackForm();

    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<Errors>({});

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = CallbackScheme.safeParse({
            fullname,
            phone,
            message,
        });

        if (!result.success) {
            const fieldErrors: Errors = {};

            result.error.issues.forEach(issue => {
                const field = issue.path[0];
                if (field) {
                    fieldErrors[field as keyof Errors] = issue.message;
                }
            });

            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        await submit(result.data);
    };

    const handleNameChange = (value: string) => {
        const clean = value.replace(/[0-9]/g, "");
        setFullname(clean);
    };
    const handlePhoneChange = (value: string) => {
        let digits = value.replace(/\D/g, "");

        if (digits.startsWith("7")) {
            digits = digits.slice(1);
        }
        digits = digits.slice(0, 10);
        setPhone("+7" + digits);
    };

    return (
        <Card className="bg-white border-neutral-200 shadow-xl h-full" >
            <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                        <Send className="w-5 h-5 text-amber-800" />
                    </div>
                    <CardTitle className="text-2xl font-serif text-neutral-800">
                        Оставить заявку
                    </CardTitle>
                </div>
                <p className="text-sm text-neutral-500">
                    Мы перезвоним в течение 15 минут
                </p>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <input
                            value={fullname}
                            onChange={e => handleNameChange(e.target.value)}
                            placeholder="Ваше имя"
                            className={`w-full border ${errors.fullname ? 'border-red-300' : 'border-neutral-300'} rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all`}
                        />
                        {errors.fullname && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.fullname}
                            </p>
                        )}
                    </div>

                    <div>
                        <input
                            value={phone}
                            onChange={e => handlePhoneChange(e.target.value)}
                            placeholder="+7 (999) 999-99-99"
                            className={`w-full border ${errors.phone ? 'border-red-300' : 'border-neutral-300'} rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all`}
                        />
                        {errors.phone && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    <div>
                        <textarea
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder="Сообщение"
                            className={`w-full border ${errors.message ? 'border-red-300' : 'border-neutral-300'} rounded-lg px-4 py-2.5 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all resize-none`}
                        />
                        {errors.message && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 h-10 text-sm rounded-lg"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                                Отправка...
                            </>
                        ) : (
                            <>
                                <Send className="w-3 h-3 mr-1.5" />
                                Отправить заявку
                            </>
                        )}
                    </Button>

                    {success && (
                        <div className="flex items-start gap-2 p-2 bg-green-50 rounded-lg border border-green-200">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-green-700 font-medium text-xs">
                                    Заявка успешно отправлена
                                </p>
                                <p className="text-green-600 text-xs">
                                    Мы свяжемся с вами в ближайшее время
                                </p>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="p-2 bg-red-50 rounded-lg border border-red-200">
                            <p className="text-red-700 font-medium text-xs">
                                {error}
                            </p>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}