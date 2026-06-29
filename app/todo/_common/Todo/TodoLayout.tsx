"use client";
import { useState } from "react";
import { Sidebar } from "../Sidebar";
import { Todo } from "./Todo";

export default function TodoLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="h-screen w-full flex ">
      <aside>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </aside>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}
      <main className="flex-4">
        <Todo sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </main>
    </div>
  );
}
