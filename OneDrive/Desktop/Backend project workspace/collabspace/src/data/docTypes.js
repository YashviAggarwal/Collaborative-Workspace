import { FileText, ClipboardList, Presentation } from "lucide-react";

export const docTypes = {
  document: { label: "Document", text: "Notes, docs and write-ups", icon: FileText, tint: "bg-brand-light text-brand", bar: "bg-brand/60" },
  report: { label: "Report", text: "Project and academic reports", icon: ClipboardList, tint: "bg-pink-soft text-pink", bar: "bg-pink/60" },
  presentation: { label: "Presentation", text: "Slides and pitch decks", icon: Presentation, tint: "bg-sky-100 text-sky-600", bar: "bg-sky-400/70" },
};
