"use client";

import { useMemo, useState } from "react";
import { Search, Phone, Calendar, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCallbacks, type CallbackRecord } from "@/hooks/useCallbacks";

export default function CallbacksPage() {
  const { callbacks, loading } = useCallbacks();

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<CallbackRecord | null>(null);

  const filteredCallbacks = useMemo(() => {
    return callbacks
      .filter((c) => {
        const q = search.toLowerCase();

        return (
          c.fullname.toLowerCase().includes(q) ||
          c.phone.includes(search)
        );
      })
      .sort((a, b) => {
        return (
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
        );
      });
  }, [callbacks, search]);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
        <h1 className="text-3xl font-bold text-neutral-900">
          Заявки
        </h1>
        <p className="text-neutral-500 text-sm">
          Всего: {callbacks.length}
        </p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-neutral-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по имени или телефону..."
            className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-neutral-400">
          Загрузка...
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredCallbacks.map((cb) => (
              <motion.div
                key={cb.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelected(cb)}
                className="bg-white p-6 rounded-2xl border border-neutral-100 hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-800">
                      {cb.fullname}
                    </h3>

                    <div className="flex flex-wrap gap-3 text-sm text-neutral-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {cb.phone}
                      </span>

                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(cb.created_at).toLocaleString()}
                      </span>
                    </div>

                    <p className="mt-3 text-neutral-700 line-clamp-2">
                      {cb.message}
                    </p>
                  </div>

                  <div className="text-sm text-neutral-400 font-medium whitespace-nowrap">
                    {new Date(cb.created_at).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredCallbacks.length === 0 && (
            <div className="bg-white p-12 rounded-2xl border border-neutral-100 text-center text-neutral-400">
              Ничего не найдено
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold">
                  Заявка #{selected.id}
                </h2>

                <button
                  onClick={() => setSelected(null)}
                  className="p-2 hover:bg-neutral-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-neutral-400">Имя</p>
                  <p className="font-medium">{selected.fullname}</p>
                </div>

                <div>
                  <p className="text-neutral-400">Телефон</p>
                  <p className="font-medium">{selected.phone}</p>
                </div>

                <div>
                  <p className="text-neutral-400">Дата</p>
                  <p className="font-medium">
                    {new Date(selected.created_at).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-neutral-400">Сообщение</p>
                  <p className="font-medium whitespace-pre-wrap">
                    {selected.message}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="w-full mt-6 py-3 bg-neutral-900 text-white rounded-xl hover:bg-black transition"
              >
                Закрыть
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}