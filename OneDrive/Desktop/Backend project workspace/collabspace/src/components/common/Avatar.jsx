const colors = {
  blue: "bg-brand text-white",
  pink: "bg-pink text-white",
  slate: "bg-slate-700 text-white",
  sky: "bg-sky-500 text-white",
};

const getInitials = (name = "") =>
  name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");

// Pass either `initials="AB"` or `name="Yashvi Aggarwal"`.
export default function Avatar({ initials, name, color = "blue", size = "h-7 w-7 text-[10px]" }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-full border-2 border-white font-bold ${size} ${colors[color]}`}>
      {initials || getInitials(name)}
    </span>
  );
}
