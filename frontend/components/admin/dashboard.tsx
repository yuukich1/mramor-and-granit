"use client";

import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import {
    Package,
    Layers,
    MessageSquare,
    TrendingUp,
    Loader2,
} from "lucide-react";
import { useCallbacks } from "@/hooks/useCallbacks";
import { useProducts } from "@/hooks/useProduct";
import { useCategories } from "@/hooks/useCategories";
import { useMemo, useState } from "react";

type Period = "week" | "month" | "year" | "all";

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("ru-RU");
}

function monthKey(date: string) {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth()}`;
}

function monthLabel(date: string) {
    return new Date(date).toLocaleDateString("ru-RU", {
        month: "short",
        year: "numeric",
    });
}

function calcChange(current: number, previous: number) {
    if (previous === 0) return "+100%";
    const diff = Math.round(((current - previous) / previous) * 100);
    return `${diff > 0 ? "+" : ""}${diff}%`;
}

function isInPeriod(date: string, period: Period) {
    if (period === "all") return true;

    const now = new Date();
    const d = new Date(date);

    if (period === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return d >= weekAgo;
    }

    if (period === "month") {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        return d >= monthAgo;
    }

    if (period === "year") {
        const yearAgo = new Date();
        yearAgo.setFullYear(now.getFullYear() - 1);
        return d >= yearAgo;
    }

    return true;
}

export default function DashboardPage() {
    const { callbacks, loading: cbLoading } = useCallbacks();
    const { allProducts, loading: prodLoading } = useProducts();
    const { categories, loading: catLoading } = useCategories();

    const [period, setPeriod] = useState<Period>("month");

    const filteredCallbacks = useMemo(() => {
        return callbacks.filter((cb) =>
            isInPeriod(cb.created_at, period)
        );
    }, [callbacks, period]);

    const callbacksByMonth = useMemo(() => {
        return filteredCallbacks.reduce<Record<string, number>>(
            (acc, cb) => {
                const key = monthKey(cb.created_at);
                acc[key] = (acc[key] || 0) + 1;
                return acc;
            },
            {}
        );
    }, [filteredCallbacks]);

    const callbacksChartData = useMemo(() => {
        return Object.keys(callbacksByMonth)
            .sort()
            .map((key) => {
                const sample = filteredCallbacks.find(
                    (c) => monthKey(c.created_at) === key
                )!;
                return {
                    month: monthLabel(sample.created_at),
                    callbacks: callbacksByMonth[key],
                };
            });
    }, [callbacksByMonth, filteredCallbacks]);

    if (cbLoading || prodLoading || catLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
            </div>
        );
    }

    const currentMonthCallbacks =
        callbacksChartData.at(-1)?.callbacks ?? 0;
    const previousMonthCallbacks =
        callbacksChartData.at(-2)?.callbacks ?? 0;

    const stats = [
        {
            label: "Всего продуктов",
            value: allProducts.length,
            icon: Package,
            change: calcChange(allProducts.length, allProducts.length - 1),
            color: "from-blue-500 to-blue-600",
        },
        {
            label: "Категорий",
            value: categories.length,
            icon: Layers,
            change: calcChange(categories.length, categories.length - 1),
            color: "from-purple-500 to-purple-600",
        },
        {
            label: "Заявок",
            value: filteredCallbacks.length,
            icon: MessageSquare,
            change: calcChange(
                currentMonthCallbacks,
                previousMonthCallbacks
            ),
            color: "from-amber-600 to-amber-700",
        },
    ];

    const latestCallbacks = [...filteredCallbacks]
        .sort(
            (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
        )
        .slice(0, 4);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-800">
                        Дашборд
                    </h1>
                    <p className="text-neutral-500 mt-1">
                        Аналитика и последние события
                    </p>
                </div>

                <div className="flex gap-2">
                    {[
                        { key: "week", label: "Неделя" },
                        { key: "month", label: "Месяц" },
                        { key: "year", label: "Год" },
                        { key: "all", label: "Всё время" },
                    ].map((p) => (
                        <button
                            key={p.key}
                            onClick={() => setPeriod(p.key as Period)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition
                                ${
                                    period === p.key
                                        ? "bg-neutral-900 text-white"
                                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                                }`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl p-6 border border-neutral-200"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div
                                className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}
                            >
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-neutral-800">
                            {stat.value}
                        </h3>
                        <p className="text-sm text-neutral-500 mt-1">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-neutral-200">
                    <h2 className="text-lg font-bold mb-6">
                        Заявки по месяцам
                    </h2>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={callbacksChartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="callbacks"
                                    stroke="#b45309"
                                    strokeWidth={3}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-neutral-200">
                    <h2 className="text-lg font-bold mb-6">
                        Динамика
                    </h2>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={callbacksChartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey="callbacks"
                                    fill="#262626"
                                    radius={[6, 6, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
                <div className="p-6 border-b border-neutral-100">
                    <h2 className="text-lg font-bold">
                        Последние заявки
                    </h2>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-neutral-50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-neutral-500">
                                ID
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-neutral-500">
                                Клиент
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-neutral-500">
                                Телефон
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-neutral-500">
                                Дата
                            </th>
                            <th className="px-6 py-4 text-xs font-bold text-neutral-500">
                                Сообщение
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {latestCallbacks.map((cb) => (
                            <tr key={cb.id}>
                                <td className="px-6 py-4 text-sm text-neutral-400">
                                    #{cb.id}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium">
                                    {cb.fullname}
                                </td>
                                <td className="px-6 py-4 text-sm text-neutral-600">
                                    {cb.phone}
                                </td>
                                <td className="px-6 py-4 text-sm text-neutral-500">
                                    {formatDate(cb.created_at)}
                                </td>
                                <td className="px-6 py-4 text-sm text-neutral-500 max-w-xs truncate">
                                    {cb.message || "—"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
