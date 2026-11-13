import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { docTypes } from "../../data/docTypes";
import useClickOutside from "../../hooks/useClickOutside";

export default function CreateMenu({ onCreate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-colors hover:bg-brand-deep"
      >
        <Plus size={16} /> <span className="hidden sm:inline">New</span>
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-2 w-60 rounded-2xl border border-line bg-white p-2 shadow-xl">
          {Object.entries(docTypes).map(([type, { label, text, icon: Icon, tint }]) => (
            <button
              key={type}
              onClick={() => {
                onCreate(type);
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors hover:bg-canvas"
            >
              <span className={`grid h-9 w-9 place-items-center rounded-lg ${tint}`}><Icon size={17} /></span>
              <span>
                <span className="block text-sm font-semibold">{label}</span>
                <span className="block text-xs text-muted">{text}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
