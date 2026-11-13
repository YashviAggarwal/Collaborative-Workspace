import { NavLink } from "react-router-dom";
import { Home, FileText, Users, Star, LayoutTemplate, Settings, LogOut, X } from "lucide-react";
import Logo from "../common/Logo";
import Avatar from "../common/Avatar";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/dashboard", label: "Overview", icon: Home, end: true },
  { to: "/dashboard/documents", label: "My Documents", icon: FileText },
  { to: "/dashboard/shared", label: "Shared with me", icon: Users },
  { to: "/dashboard/favorites", label: "Favorites", icon: Star },
  { to: "/dashboard/templates", label: "Templates", icon: LayoutTemplate },
];

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive ? "bg-brand-light text-brand" : "text-muted hover:bg-canvas hover:text-ink"
  }`;

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth(); // logging out clears user, ProtectedRoute then sends you to /login

  return (
    <>
      {/* Dark overlay on mobile */}
      {open && <div className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden" onClick={onClose} />}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-line bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Logo />
          <button onClick={onClose} aria-label="Close menu" className="text-muted lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={onClose} className={linkClass}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-1 border-t border-line px-3 py-4">
          <NavLink to="/dashboard/settings" onClick={onClose} className={linkClass}>
            <Settings size={18} /> Settings
          </NavLink>
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-canvas hover:text-ink">
            <LogOut size={18} /> Log out
          </button>

          <div className="mt-3 flex items-center gap-3 rounded-xl bg-canvas p-3">
            <Avatar name={user.name} color="pink" size="h-9 w-9 text-xs" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate text-xs text-muted">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
