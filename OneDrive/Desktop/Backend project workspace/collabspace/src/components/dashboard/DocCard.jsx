import { Link } from "react-router-dom";
import { Star, Trash2, Users } from "lucide-react";
import { docTypes } from "../../data/docTypes";
import Avatar from "../common/Avatar";

export default function DocCard({ doc, onToggleFavorite, onDelete }) {
  const { label, icon: Icon, tint, bar } = docTypes[doc.type];

  return (
    <div className="group relative rounded-2xl border border-line bg-white p-3 transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-xl hover:shadow-brand/10">
      {/* The editor page (/doc/:id) is built in Phase 4 */}
      <Link to={`/doc/${doc.id}`} className="block">
        <div className="space-y-1.5 rounded-xl bg-canvas p-4">
          <div className={`h-2 w-2/3 rounded ${bar}`} />
          <div className="h-1.5 w-full rounded bg-slate-200" />
          <div className="h-1.5 w-4/5 rounded bg-slate-200" />
          <div className="h-1.5 w-1/2 rounded bg-slate-200" />
        </div>

        <div className="flex items-start gap-3 px-1 pb-1 pt-4">
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${tint}`}><Icon size={17} /></span>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold">{doc.title}</h3>
            <p className="text-xs text-muted">{label} · {doc.updatedAt}</p>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between px-1 pt-3">
        {doc.collaborators.length > 0 ? (
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {doc.collaborators.map((c) => <Avatar key={c} initials={c} color="slate" size="h-6 w-6 text-[9px]" />)}
            </div>
            <Users size={12} className="text-muted" />
          </div>
        ) : (
          <span className="text-[11px] text-muted">Only you</span>
        )}

        <div className="flex items-center gap-1">
          <button
            onClick={() => onToggleFavorite(doc.id)}
            aria-label={doc.favorite ? "Remove from favorites" : "Add to favorites"}
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-canvas hover:text-amber-500"
          >
            <Star size={16} className={doc.favorite ? "fill-amber-400 text-amber-400" : ""} />
          </button>
          <button
            onClick={() => window.confirm(`Delete "${doc.title}"?`) && onDelete(doc.id)}
            aria-label="Delete file"
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
