"use client";

import { 
    BarChart, Bar, LineChart, Line, XAxis, YAxis, 
    CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";
import { Package, Layers, MessageSquare, TrendingUp, Loader2 } from "lucide-react";
import { useCallbacks } from "@/hooks/useCallbacks";
import { useProducts } from "@/hooks/useProduct";
import { useCategories } from "@/hooks/useCategories";

export default function DashboardPage() {
    const { callbacks, loading: cbLoading } = useCallbacks();
    const { allProducts, loading: prodLoading } = useProducts();
    const { categories, loading: catLoading } = useCategories();

    if (cbLoading || prodLoading || catLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
            </div>
        );
    }

    const calcChange = (current: number, previous: number) => {
        if (previous === 0) return "+100%";
        const diff = current - previous;
        const percent = Math.round((diff / previous) * 100);
        return `${percent > 0 ? "+" : ""}${percent}%`;
    };

    const stats = [
        {
            label: "Всего продуктов",
            value: allProducts.length,
            icon: Package,
            change: calcChange(allProducts.length, allProducts.length - 10),
            color: "from-blue-500 to-blue-600",
        },
        {
            label: "Категорий",
            value: categories.length,
            icon: Layers,
            change: calcChange(categories.length, categories.length - 2),
            color: "from-purple-500 to-purple-600",
        },
        {
            label: "Заявок",
            value: callbacks.length,
            icon: MessageSquare,
            change: calcChange(callbacks.length, callbacks.length - 5),
            color: "from-amber-600 to-amber-700",
        },
    ];

    const callbacksChartData = Array.from({ length: 6 }, (_, i) => {
        const monthNames = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн"];
        const current = callbacks.length / 6;
        const previous = (callbacks.length / 6) * (i > 0 ? i : 0.5);
        return { month: monthNames[i], callbacks: Math.round(current + previous) };
    });

    // const getStatusBadge = (status: string) => {
    //     const styles = {
    //         new: "bg-blue-100 text-blue-700",
    //         processing: "bg-yellow-100 text-yellow-700",
    //         completed: "bg-green-100 text-green-700",
    //     };
    //     const labels = {
    //         new: "Новая",
    //         processing: "В обработке",
    //         completed: "Завершена",
    //     };
    //     return (
    //         <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
    //             {labels[status as keyof typeof labels] || status}
    //         </span>
    //     );
    // };

    const latestCallbacks = callbacks.slice(-5).reverse();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-neutral-800">Дашборд</h1>
                <p className="text-neutral-500 mt-1">Аналитика и последние события</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg shadow-neutral-200`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-neutral-800">{stat.value}</h3>
                        <p className="text-sm text-neutral-500 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
                    <h2 className="text-lg font-bold text-neutral-800 mb-6">Заявки по месяцам</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={callbacksChartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#a3a3a3', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#a3a3a3', fontSize: 12}} />
                                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                                <Line type="monotone" dataKey="callbacks" stroke="#b45309" strokeWidth={3} dot={{r: 6, fill: '#b45309', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8}} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
                    <h2 className="text-lg font-bold text-neutral-800 mb-6">Динамика</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={callbacksChartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#a3a3a3', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#a3a3a3', fontSize: 12}} />
                                <Tooltip cursor={{fill: '#f8f8f8'}} contentStyle={{borderRadius: '12px', border: 'none'}} />
                                <Bar dataKey="callbacks" fill="#262626" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-neutral-800">Последние заявки</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-neutral-50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Клиент</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Телефон</th>
                                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Сообщение</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {latestCallbacks.length > 0 ? (
                                latestCallbacks.map((cb) => (
                                    <tr key={cb.id} className="hover:bg-neutral-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-neutral-400 font-mono">
                                            #{cb.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-neutral-800">
                                            {cb.fullname}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-neutral-600">
                                            <a href={`${cb.phone}`} className="hover:text-amber-700 transition-colors">
                                                {cb.phone}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-neutral-500 max-w-xs truncate">
                                            {cb.message || "—"} 
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-neutral-400">
                                        Новых заявок пока нет
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
