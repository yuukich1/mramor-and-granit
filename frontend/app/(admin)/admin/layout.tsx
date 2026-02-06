"use client";
import { AdminSidebar } from "@/components/admin/sidebar";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (

    <div className="flex min-h-screen bg-neutral-100">
      <AdminSidebar />
      <main className="flex-1 flex flex-col overflow-y-auto">
        <section className="p-8">{children}</section>
      </main>
    </div>
  );
}