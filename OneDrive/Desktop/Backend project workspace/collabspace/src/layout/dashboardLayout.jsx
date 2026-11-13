import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { useAuth } from "../context/AuthContext";
import { initialDocs } from "../data/mockData";
import { docTypes } from "../data/docTypes";

// Wraps every /dashboard/* page. Doc state lives here so all child pages share it.
// Phase 3: swap the docs state for API calls.
export default function DashboardLayout() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState(initialDocs);

  const createDoc = (type) => {
    const doc = {
      id: crypto.randomUUID(),
      title: `Untitled ${docTypes[type].label.toLowerCase()}`,
      type,
      updatedAt: "Just now",
      favorite: false,
      collaborators: [],
    };
    setDocs((d) => [doc, ...d]);
  };

  const toggleFavorite = (id) =>
    setDocs((d) => d.map((doc) => (doc.id === id ? { ...doc, favorite: !doc.favorite } : doc)));

  const deleteDoc = (id) => setDocs((d) => d.filter((doc) => doc.id !== id));

  return (
    <div className="flex h-screen bg-canvas font-sans text-ink antialiased">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar query={query} onQuery={setQuery} onMenu={() => setMenuOpen(true)} onCreate={createDoc} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet context={{ user, docs, query, createDoc, toggleFavorite, deleteDoc }} />
        </main>
      </div>
    </div>
  );
}
