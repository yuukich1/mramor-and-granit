"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Package, Layers, MessageSquare, LogOut, Menu, X } from "lucide-react";

const menuItems = [
  { path: "/admin", label: "Дашборд", icon: LayoutDashboard },
  { path: "/admin/products", label: "Продукты", icon: Package },
  { path: "/admin/categories", label: "Категории", icon: Layers },
  { path: "/admin/callbacks", label: "Заявки", icon: MessageSquare },
];



export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = "access_token=; max-age=0; path=/";
    router.push("/login");
  };

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-neutral-200"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black z-30"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-neutral-200 
          flex flex-col z-40 transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-6 border-b border-neutral-200">
          <h1 className="text-xl font-bold text-neutral-800">Мрамор и Гранит</h1>
          <p className="text-sm text-neutral-500 mt-1">Админ-панель</p>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="relative space-y-2">
            {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                <li key={item.path} className="relative">
                    <Link
                    href={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 ${
                        isActive ? "text-white" : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                    >
                    {isActive && (
                        <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-neutral-800 rounded-xl shadow-md"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        style={{ zIndex: 0 }}
                        />
                    )}

                    <span className="relative z-10 flex items-center gap-3">
                        <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-neutral-500"}`} />
                        <span className="font-medium">{item.label}</span>
                    </span>

                    {isActive && (
                        <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="relative z-10 ml-auto w-1.5 h-1.5 bg-amber-500 rounded-full"
                        />
                    )}
                    </Link>
                </li>
                );
            })}
            </ul>
        </nav>

        <div className="p-4 border-t border-neutral-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-neutral-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Выйти</span>
          </button>
        </div>
      </aside>
    </>
  );
}