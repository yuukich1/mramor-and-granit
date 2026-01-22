"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, X, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/components/ui/utils";

export function ReviewsAndMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const script = document.createElement("script");
    script.src =
      "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A970f69c5e51cef70bfbf75436a387d370cd2a920ece840b8b81bf3f81e02f707&amp;width=100%25&amp;height=600&amp;lang=ru_RU&amp;scroll=false";
    script.async = true;

    mapContainerRef.current.appendChild(script);

    return () => {
      mapContainerRef.current?.removeChild(script);
    };
  }, []);


  

  return (
    <section className="relative w-full h-[600px] lg:h-[500px] overflow-hidden bg-gray-50">
      <div ref={mapContainerRef} className="w-full h-full rounded-xl" />

      {!isMobile ? (
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-1/2 left-[300px] -translate-y-1/2 bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl max-w-sm w-[90%]"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl lg:text-4xl font-serif text-neutral-900 mb-6"
          >
            Мрамор и Гранит
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, staggerChildren: 0.1 }}
            className="space-y-4"
          >
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-neutral-700"
            >
              <div className="p-2 bg-amber-50 rounded-lg">
                <MapPin className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-sm lg:text-base">Адрес: г. Самара, ул. ​Александра Матросова, 100​, 1 этаж</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 text-neutral-700"
            >
              <div className="p-2 bg-amber-50 rounded-lg">
                <Phone className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-sm lg:text-base">Телефон: +7 (927) 766‒09‒33</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 text-neutral-700"
            >
              <div className="p-2 bg-amber-50 rounded-lg">
                <Mail className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-sm lg:text-base">Email: info@krasnoebeloye.ru</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 text-neutral-700"
            >
              <div className="p-2 bg-amber-50 rounded-lg">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-sm lg:text-base">График работы: 09:00 - 17:00</span>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setInfoVisible(!infoVisible)}
            className={cn(
              "absolute bottom-6 left-1/2 transform -translate-x-1/2",
              "bg-white/90 backdrop-blur-xl rounded-full px-6 py-3 shadow-lg",
              "flex items-center gap-2 font-medium text-neutral-800",
              "hover:bg-white transition-all duration-300"
            )}
          >
            {infoVisible ? (
              <>
                <ChevronDown className="w-5 h-5" />
                Скрыть информацию
              </>
            ) : (
              <>
                <ChevronUp className="w-5 h-5" />
                Показать информацию
              </>
            )}
          </motion.button>

          <AnimatePresence>
            {infoVisible && (
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl rounded-t-3xl p-6 shadow-2xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif text-neutral-900">
                    Красное&Белое
                  </h2>
                  <button
                    onClick={() => setInfoVisible(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, staggerChildren: 0.1 }}
                  className="space-y-4"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 text-neutral-700"
                  >
                    <MapPin className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                    <span className="text-base">Адрес: г. Самара, ул. ​Александра Матросова, 100​, 1 этаж </span>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-start gap-3 text-neutral-700"
                  >
                    <Phone className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                    <span className="text-base">Телефон: +7 (927) 766‒09‒33</span>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start gap-3 text-neutral-700"
                  >
                    <Mail className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                    <span className="text-base">Email: info@krasnoebeloye.ru</span>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start gap-3 text-neutral-700"
                  >
                    <Clock className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                    <span className="text-base">График работы: 09:00 - 17:00</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </section>
  );
}