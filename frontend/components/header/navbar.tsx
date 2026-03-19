"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/components/ui/utils";
import { NAV_ITEMS } from "./nav-items";
import { TelegramIcon, VKIcon } from "./icon";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((i) =>
        document.querySelector(i.href)
      ).filter(Boolean) as HTMLElement[];

      const current = sections.findLast(
        (section) => section.getBoundingClientRect().top <= 120
      );

      if (current) setActiveHash(`#${current.id}`);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const handleAnchorClick = () => setMobileOpen(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-xl border-b border-black/5",
          scrolled && "bg-white/95"
        )}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden sm:flex items-center justify-between py-2 text-sm text-neutral-700">
            <div className="flex items-center gap-4">
              <a href="tel:+79277660933" className="flex items-center gap-2 hover:text-amber-700 transition">
                <Phone className="h-4 w-4" />
                +7 (927) 766‒09‒33
              </a>
              <a href="tel:+79379890153" className="flex items-center gap-2 hover:text-amber-700 transition">
                <Phone className="h-4 w-4" />
                +7 (937) 989-01-53
              </a>
              <a href="https://t.me/mig_ritual" className="flex items-center gap-2 hover:text-amber-700 transition">
                <TelegramIcon />
                Telegram
              </a>
              <a href="https://vk.ru/club178020227" className="flex items-center gap-2 hover:text-amber-700 transition">
                <VKIcon />
                VK
              </a>
            </div>
            <span className="text-neutral-600">Ежедневно 9:00–17:00</span>
          </div>

          <div className="flex items-center justify-between py-4">
            <div className="font-serif text-xl sm:text-2xl text-neutral-900">
              Мрамор и Гранит
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => {
                const isActive = activeHash === item.href;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-1 text-neutral-800 transition-colors hover:text-amber-700",
                      isActive && "text-amber-700"
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="hidden md:block">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white shadow-sm">
                <a href="#contact">Заказать звонок</a>
              </Button>
            </div>

            <button
              aria-label="Открыть меню"
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden text-black rounded-lg p-2 hover:bg-black/5 transition"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 backdrop-blur-xl bg-white/10 z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed inset-0 bg-black/20 z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              className="fixed top-24 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-[110]"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/40 p-6">
              <h1 className="font-serif text-xl sm:text-2xl text-neutral-900 text-center mb-6">
                Мрамор и Гранит
              </h1>
                <div className="flex flex-col gap-4">
                  {NAV_ITEMS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={handleAnchorClick}
                      className="text-center text-base"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                <div className="mt-5 space-y-2">
                  <a href="tel:+79277660933" className="flex items-center justify-center gap-2 text-sm text-neutral-700 hover:text-amber-700 transition">
                    <Phone className="h-4 w-4" />
                    +7 (927) 766‒09‒33
                  </a>
                  <a href="tel:+79379890153" className="flex items-center justify-center gap-2 text-sm text-neutral-700 hover:text-amber-700 transition">
                    <Phone className="h-4 w-4" />
                    +7 (937) 989-01-53
                  </a>
                </div>

                <div className="flex justify-center gap-4 mt-4">
                  <a href="https://t.me/mig_ritual" className="flex items-center gap-2 text-sm bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg">
                    <TelegramIcon />
                    Telegram
                  </a>
                  <a href="https://vk.ru/club178020227" className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg">
                    <VKIcon />
                    VK
                  </a>
                </div>

                <Button
                  className="mt-5 w-full bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={handleAnchorClick}
                >
                  <a href="#contact">
                    Заказать звонок
                  </a>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}