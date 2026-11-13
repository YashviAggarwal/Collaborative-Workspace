import { Link } from "react-router-dom";
import { Layers } from "lucide-react";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white shadow-md shadow-brand/30">
        <Layers size={19} />
      </span>
      <span className="text-lg font-extrabold tracking-tight text-ink">CollabSpace</span>
    </Link>
  );
}