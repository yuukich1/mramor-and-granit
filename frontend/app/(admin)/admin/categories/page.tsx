"use client";

import { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Package,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/api/axiosInstance";
import { useCategories } from "@/hooks/useCategories";
import type { Category } from "@/types/category";

type FormState = {
  name: string;
};

export default function CategoriesPage() {
  const { categories, loading, refreshCategories } = useCategories();

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState<FormState>({
    name: "",
  });


  const openCreate = () => {
    setEditingCategory(null);
    setForm({ name: "" });
    setShowModal(true);
  };

  const openEdit = (cat: Category) => {
    setEditingCategory(cat);
    setForm({ name: cat.name });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError("Введите название категории");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingCategory) {
        await api.put(`/categories/${editingCategory.id}`, form);
      } else {
        await api.post("/categories/", form);
      }

      await refreshCategories();
      closeModal();
    } catch (err) {
      console.error(err);
      setError("Ошибка при сохранении");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    setIsSubmitting(true);
    try {
      await api.delete(`/categories/${deleteId}`);
      await refreshCategories();
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      setError("Ошибка удаления");
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">
            Категории
          </h1>
          <p className="text-neutral-500 text-sm">
            Управление каталогом
          </p>
        </div>

        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-5 py-3 bg-neutral-900 text-white rounded-xl hover:bg-black transition active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Добавить
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-neutral-300" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {categories.map((cat) => (
              <motion.div
                key={cat.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="group bg-white border border-neutral-100 rounded-2xl p-5 hover:shadow-xl transition-all"
              >
                <div className="flex justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center">
                    <Package className="w-6 h-6 text-neutral-700" />
                  </div>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => openEdit(cat)}
                      className="p-2 hover:bg-neutral-100 rounded-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setDeleteId(cat.id)}
                      className="p-2 hover:bg-red-50 text-red-500 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-lg text-neutral-800">
                  {cat.name}
                </h3>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl"
            >
              <h2 className="text-xl font-bold mb-4">
                {editingCategory ? "Редактировать" : "Новая категория"}
              </h2>

              <input
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="Название"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
              />

              <div className="flex gap-3 mt-6">
                <button
                  onClick={closeModal}
                  className="flex-1 py-3 bg-neutral-100 rounded-xl"
                >
                  Отмена
                </button>

                <button
                  onClick={handleSave}
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-neutral-900 text-white rounded-xl flex justify-center"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin w-5 h-5" />
                  ) : editingCategory ? (
                    "Сохранить"
                  ) : (
                    "Создать"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
              onClick={() => setDeleteId(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-3xl p-6 text-center shadow-2xl max-w-sm w-full"
            >
              <div className="mx-auto w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
                <Trash2 />
              </div>

              <h3 className="text-xl font-bold mb-2">
                Удалить категорию?
              </h3>

              <p className="text-neutral-500 text-sm mb-6">
                Это действие нельзя отменить
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-3 bg-neutral-100 rounded-xl"
                >
                  Отмена
                </button>

                <button
                  onClick={confirmDelete}
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-red-500 text-white rounded-xl flex justify-center"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin w-5 h-5" />
                  ) : (
                    "Удалить"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
              onClick={() => setError(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-3xl p-6 text-center shadow-2xl max-w-sm w-full"
            >
              <div className="mx-auto w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle />
              </div>

              <h3 className="text-xl font-bold mb-2">Ошибка</h3>

              <p className="text-neutral-500 text-sm mb-6">{error}</p>

              <button
                onClick={() => setError(null)}
                className="w-full py-3 bg-neutral-900 text-white rounded-xl"
              >
                Понятно
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}