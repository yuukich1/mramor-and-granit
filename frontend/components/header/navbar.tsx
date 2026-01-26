"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/components/ui/utils";
import { NAV_ITEMS } from "./nav-items";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");

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
              +7 (495) 123-45-67
            </a>
            <a
              href="mailto:info@memorial.ru"
              className="flex items-center gap-2 hover:text-amber-700 transition"
            >
              <Mail className="h-4 w-4" />
              info@memorial.ru
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
              className="flex flex-col px-4 py-6 gap-6"
            >
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ 
                    delay: 0.1 * index + 0.3,
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  <a
                    href={item.href}
                    onClick={handleAnchorClick}
                    className={cn(
                      "relative text-lg font-medium py-3 text-neutral-800 transition-colors block text-center",
                      activeHash === item.href && "text-amber-700 font-semibold"
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 w-16 bg-amber-600 scale-x-0 origin-center transition-transform duration-300",
                        activeHash === item.href && "scale-x-100"
                      )}
                    />
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ 
                  delay: 0.5,
                  duration: 0.3,
                  ease: "easeOut"
                }}
                className="mt-4"
              >
                <Button className="bg-amber-600 hover:bg-amber-700 text-white text-lg py-6 px-8 w-full">
                  <a href="#contact">
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
