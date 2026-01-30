"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, Mail, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/components/ui/utils";
import { NAV_ITEMS } from "./nav-items";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");

const TelegramIcon = () => (
    <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
    >
        <path fill="#0065ca" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.68c.223-.198-.054-.308-.346-.11l-6.4 4.03-2.76-.918c-.6-.187-.612-.6.125-.89l10.782-4.156c.5-.18.943.12.78.89z"/>
    </svg>
);

const VKIcon = () => (
    <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 48 48"
    >
         <path fill="#02509e" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5 V37z"></path><path fill="#fff" d="M35.937,18.041c0.046-0.151,0.068-0.291,0.062-0.416C35.984,17.263,35.735,17,35.149,17h-2.618 c-0.661,0-0.966,0.4-1.144,0.801c0,0-1.632,3.359-3.513,5.574c-0.61,0.641-0.92,0.625-1.25,0.625C26.447,24,26,23.786,26,23.199 v-5.185C26,17.32,25.827,17,25.268,17h-4.649C20.212,17,20,17.32,20,17.641c0,0.667,0.898,0.827,1,2.696v3.623 C21,24.84,20.847,25,20.517,25c-0.89,0-2.642-3-3.815-6.932C16.448,17.294,16.194,17,15.533,17h-2.643 C12.127,17,12,17.374,12,17.774c0,0.721,0.6,4.619,3.875,9.101C18.25,30.125,21.379,32,24.149,32c1.678,0,1.85-0.427,1.85-1.094 v-2.972C26,27.133,26.183,27,26.717,27c0.381,0,1.158,0.25,2.658,2c1.73,2.018,2.044,3,3.036,3h2.618 c0.608,0,0.957-0.255,0.971-0.75c0.003-0.126-0.015-0.267-0.056-0.424c-0.194-0.576-1.084-1.984-2.194-3.326 c-0.615-0.743-1.222-1.479-1.501-1.879C32.062,25.36,31.991,25.176,32,25c0.009-0.185,0.105-0.361,0.249-0.607 C32.223,24.393,35.607,19.642,35.937,18.041z"></path>
    </svg>
);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((i) =>
        document.querySelector(i.href),
      ).filter(Boolean) as HTMLElement[];

      const current = sections.findLast(
        (section) =>
          section.getBoundingClientRect().top <= 120,
      );

      if (current) setActiveHash(`#${current.id}`);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchorClick = () => setMobileOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 backdrop-blur-lg transition-all duration-300",
        scrolled
          ? "bg-white/75"
          : "bg-white/95",
      )}
    >
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden sm:flex items-center justify-between py-2 text-sm text-neutral-700">
          <div className="flex items-center gap-4">
            <a
              href="tel:+79277660933"
              className="flex items-center gap-2 hover:text-amber-700 transition"
            >
              <Phone className="h-4 w-4" />
              +7 (927) 766‒09‒33
            </a>
            <a
              href="tel:+79379890153"
              className="flex items-center gap-2 hover:text-amber-700 transition"
            >
              <Phone className="h-4 w-4" />
              +7 (937) 989-01-53
            </a>
            <a
              href="https://t.me/mig_ritual"  
              className="flex items-center gap-2 hover:text-amber-700 transition"
            >
              <TelegramIcon />
              Telegram
            </a>
            <a
              href="https://vk.ru/club178020227"  
              className="flex items-center gap-2 hover:text-amber-700 transition"
            >
              <VKIcon />
              VK
            </a>
          </div>
          <span className="text-neutral-600">
            Ежедневно 9:00–17:00
          </span>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

        <div className="flex items-center justify-between py-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-serif text-xl sm:text-2xl"
          >
            <span className="text-neutral-900">
              Мрамор и Гранит
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive =
                activeHash === item.href;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-1 text-neutral-800 transition-colors",
                    "hover:text-amber-700",
                    isActive && "text-amber-700",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-amber-600 transition-transform duration-300",
                      "group-hover:scale-x-100",
                      isActive && "scale-x-100",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white shadow-sm">
                <a href="#contact">
                    Заказать звонок
                </a>
            </Button>
          </div>

          <button
            aria-label="Открыть меню"
            onClick={() =>
              setMobileOpen((v) => !v)}
            className="md:hidden text-black rounded-lg p-2 hover:bg-black/5 transition "
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-black/10 overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-col px-4 py-4 gap-4"
            >
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ 
                    delay: 0.1 * index + 0.2,
                    duration: 0.25,
                    ease: "easeOut"
                  }}
                >
                  <a
                    href={item.href}
                    onClick={handleAnchorClick}
                    className={cn(
                      "relative text-base font-medium py-2 text-neutral-800 transition-colors block text-center", /* Уменьшен размер текста и padding */
                      activeHash === item.href && "text-amber-700 font-semibold"
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-12 bg-amber-600 scale-x-0 origin-center transition-transform duration-300", /* Уменьшенная полоска */
                        activeHash === item.href && "scale-x-100"
                      )}
                    />
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ 
                  delay: 0.5,
                  duration: 0.25,
                  ease: "easeOut"
                }}
                className="mt-2 space-y-3"
              >
                <div className="space-y-2">
                  <a
                    href="tel:+79277660933"
                    className="flex items-center justify-center gap-2 text-sm text-neutral-700 hover:text-amber-700 transition"
                    onClick={handleAnchorClick}
                  >
                    <Phone className="h-4 w-4" />
                    +7 (927) 766‒09‒33
                  </a>
                  <a
                    href="tel:+79379890153"
                    className="flex items-center justify-center gap-2 text-sm text-neutral-700 hover:text-amber-700 transition"
                    onClick={handleAnchorClick}
                  >
                    <Phone className="h-4 w-4" />
                    +7 (937) 989-01-53
                  </a>
                </div>

                <div className="flex justify-center gap-4">
                  <a
                    href="https://t.me/mig_ritual"
                    className="flex items-center gap-2 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1.5 rounded-lg transition" /* Уменьшен padding */
                    onClick={handleAnchorClick}
                  >
                    <TelegramIcon />
                    Telegram
                  </a>
                  <a
                    href="https://vk.ru/club178020227"
                    className="flex items-center gap-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition" /* Уменьшен padding */
                    onClick={handleAnchorClick}
                  >
                    <VKIcon />
                    VK
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ 
                  delay: 0.6,
                  duration: 0.25,
                  ease: "easeOut"
                }}
                className="mt-2" 
              >
                <Button className="bg-amber-600 hover:bg-amber-700 text-white text-base py-3 px-6 w-full"> 
                  <a href="#contact" onClick={handleAnchorClick}>
                    Заказать звонок
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}