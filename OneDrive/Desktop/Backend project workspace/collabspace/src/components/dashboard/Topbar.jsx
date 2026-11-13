import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, Bell, Settings, LogOut } from "lucide-react";
import Avatar from "../common/Avatar";
import CreateMenu from "./CreateMenu";
import useClickOutside from "../../hooks/useClickOutside";
import { useAuth } from "../../context/AuthContext";

export default function Topbar({ query, onQuery, onMenu, onCreate }) {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setProfileOpen(false));

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-line bg-white px-4 sm:px-6">
      <button onClick={onMenu} aria-label="Open menu" className="text-slate-600 lg:hidden">
        <Menu size={22} />
      </button>

      <div className="relative max-w-md flex-1">
        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search your files..."
          className="w-full rounded-xl border border-line bg-canvas py-2.5 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <CreateMenu onCreate={onCreate} />

        <button aria-label="Notifications" className="relative grid h-9 w-9 place-items-center rounded-xl text-slate-600 transition-colors hover:bg-canvas">
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-pink ring-2 ring-white" />
        </button>

        <div ref={ref} className="relative">
          <button onClick={() => setProfileOpen(!profileOpen)} aria-label="Profile menu">
            <Avatar name={user.name} color="pink" size="h-9 w-9 text-xs" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 z-30 mt-2 w-56 rounded-2xl border border-line bg-white p-2 shadow-xl">
              <div className="border-b border-line px-3 pb-2 pt-1">
                <p className="truncate text-sm font-semibold">{user.name}</p>
                <p className="truncate text-xs text-muted">{user.email}</p>
              </div>
              <Link to="/dashboard/settings" onClick={() => setProfileOpen(false)} className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-canvas">
                <Settings size={15} /> Settings
              </Link>
              <button onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-canvas">
                <LogOut size={15} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
