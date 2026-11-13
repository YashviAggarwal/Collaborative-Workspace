import { Construction } from "lucide-react";

// Temporary page for sidebar links that get built in later phases.
export default function Placeholder({ title }) {
  return (
    <div className="mx-auto grid max-w-lg place-items-center py-24 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-light text-brand"><Construction size={26} /></span>
      <h1 className="mt-5 text-2xl font-extrabold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-muted">This page is coming soon.</p>
    </div>
  );
}
