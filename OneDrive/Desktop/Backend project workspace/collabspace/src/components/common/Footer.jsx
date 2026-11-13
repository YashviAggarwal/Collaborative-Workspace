import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

const footerCols = [
  { title: "Product", links: [["Features", "#features"], ["Templates", "#templates"], ["How It Works", "#how-it-works"]] },
  { title: "Resources", links: [["Template Library", "/templates"], ["Project Kits", "/project-kits"]] },
  { title: "Company", links: [["About", "#about"], ["Privacy", "/privacy"], ["Terms", "/terms"]] },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">One workspace. Every document. Your entire team.</p>
        </div>
        {footerCols.map((c) => (
          <div key={c.title}>
            <h4 className="text-sm font-bold">{c.title}</h4>
            <ul className="mt-4 space-y-3">
              {c.links.map(([label, href]) => (
                <li key={label}>
                  {href.startsWith("#") ? (
                    <a href={href} className="text-sm text-muted hover:text-brand">{label}</a>
                  ) : (
                    <Link to={href} className="text-sm text-muted hover:text-brand">{label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} CollabSpace. All rights reserved.
      </div>
    </footer>
  );
}