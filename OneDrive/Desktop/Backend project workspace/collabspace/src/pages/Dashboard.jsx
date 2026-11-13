import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FolderKanban, Users, Star, SearchX } from "lucide-react";
import { docTypes } from "../data/docTypes";
import DocCard from "../components/dashboard/DocCard";

const tabs = [
  { key: "all", label: "All" },
  { key: "document", label: "Documents" },
  { key: "report", label: "Reports" },
  { key: "presentation", label: "Presentations" },
];

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
};

export default function Dashboard() {
  const { user, docs, query, createDoc, toggleFavorite, deleteDoc } = useOutletContext();
  const [tab, setTab] = useState("all");

  const visible = docs.filter(
    (d) => (tab === "all" || d.type === tab) && d.title.toLowerCase().includes(query.toLowerCase())
  );

  const stats = [
    { label: "Total files", value: docs.length, icon: FolderKanban },
    { label: "Shared with team", value: docs.filter((d) => d.collaborators.length).length, icon: Users },
    { label: "Favorites", value: docs.filter((d) => d.favorite).length, icon: Star },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
          {greeting()}, {user.name.split(" ")[0]}!
        </h1>
        <p className="mt-1 text-sm text-muted">What are we creating today?</p>
      </div>

      {/* Quick create */}
      <div className="grid gap-4 sm:grid-cols-3">
        {Object.entries(docTypes).map(([type, { label, text, icon: Icon, tint }]) => (
          <button
            key={type}
            onClick={() => createDoc(type)}
            className="flex items-center gap-4 rounded-2xl border border-line bg-white p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-xl hover:shadow-brand/10"
          >
            <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${tint}`}><Icon size={22} /></span>
            <span>
              <span className="block font-bold">New {label.toLowerCase()}</span>
              <span className="block text-xs text-muted">{text}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="flex items-center justify-between rounded-2xl border border-line bg-white p-5">
            <div>
              <p className="text-xs font-medium text-muted">{label}</p>
              <p className="mt-1 text-2xl font-extrabold">{value}</p>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-canvas text-slate-500"><Icon size={18} /></span>
          </div>
        ))}
      </div>

      {/* Recent files */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold">Recent files</h2>
          <div className="flex gap-1 rounded-xl bg-white p-1 ring-1 ring-line">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  tab === t.key ? "bg-brand text-white" : "text-muted hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {visible.length > 0 ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((doc) => (
              <DocCard key={doc.id} doc={doc} onToggleFavorite={toggleFavorite} onDelete={deleteDoc} />
            ))}
          </div>
        ) : (
          <div className="mt-5 grid place-items-center rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-canvas text-slate-400"><SearchX size={22} /></span>
            <p className="mt-4 font-bold">No files found</p>
            <p className="mt-1 text-sm text-muted">Try a different search, or create something new.</p>
          </div>
        )}
      </section>
    </div>
  );
}
