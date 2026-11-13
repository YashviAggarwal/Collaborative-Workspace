import { Link } from "react-router-dom";
import {
  Sparkles, FileText, Presentation, MessageSquare, Home as HomeIcon,
  Users, Star, LayoutTemplate, Share2, History, FolderKanban, Check,
} from "lucide-react";
import Navbar from "../components/common/NavBar";
import Footer from "../components/common/Footer";

/* ------------------------------------------------------------------ */
/* Small shared pieces                                                 */
/* ------------------------------------------------------------------ */

const avatarColors = {
  blue: "bg-brand text-white",
  pink: "bg-pink text-white",
  slate: "bg-slate-700 text-white",
  sky: "bg-sky-500 text-white",
};

function Avatar({ initials, color = "blue", size = "h-7 w-7 text-[10px]" }) {
  return (
    <span className={`grid place-items-center rounded-full border-2 border-white font-bold ${size} ${avatarColors[color]}`}>
      {initials}
    </span>
  );
}

function Lines({ n = 3 }) {
  return (
    <div className="space-y-1.5">
      {Array.from({ length: n }).map((_, i) => (
        <div key={i} className={`h-1.5 rounded bg-slate-200 ${i % 3 === 0 ? "w-full" : i % 3 === 1 ? "w-4/5" : "w-3/5"}`} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

const heroDocs = [
  { title: "EventSphere Project Report", type: "Report", icon: FileText },
  { title: "Smart Parking Presentation", type: "Presentation", icon: Presentation },
  { title: "Software Documentation", type: "Document", icon: FileText },
];

function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-24 pt-32 md:pt-40">
      {/* Mesh gradient background: blue on top, sky left, pink right and bottom */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-white">
        <div className="absolute left-1/2 top-[-240px] h-[540px] w-[1100px] -translate-x-1/2 rounded-full bg-brand/45 blur-[130px]" />
        <div className="absolute left-[-200px] top-[220px] h-[440px] w-[540px] rounded-full bg-sky-300/50 blur-[120px]" />
        <div className="absolute right-[-180px] top-[240px] h-[480px] w-[580px] rounded-full bg-pink/35 blur-[120px]" />
        <div className="absolute bottom-[-140px] left-1/2 h-[380px] w-[950px] -translate-x-1/2 rounded-full bg-pink/25 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-canvas" />
      </div>

      <div className="mx-auto max-w-6xl px-5 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-pink shadow-sm backdrop-blur">
          <Sparkles size={13} /> Real-time collaboration for teams
        </span>

        <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tighter text-ink sm:text-6xl md:text-7xl">
          Everything your team creates, <span className="text-brand">together.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
          Create documents, reports, and presentations. Collaborate in real time and bring every project into one beautiful workspace.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/signup" className="w-full rounded-xl bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand/30 transition-all hover:-translate-y-0.5 hover:bg-brand-deep sm:w-auto">
            Start Creating
          </Link>
          <Link to="/templates" className="w-full rounded-xl border border-white/80 bg-white/70 px-7 py-3.5 text-sm font-semibold text-ink shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white sm:w-auto">
            Explore Templates
          </Link>
        </div>
        <p className="mt-5 text-xs font-medium text-slate-500">Free for students · No credit card</p>
      </div>

      {/* Product mockup */}
      <div className="relative mx-auto mt-16 max-w-5xl px-5">
        <div className="rounded-[1.75rem] bg-white/40 p-2 shadow-2xl shadow-brand/15 ring-1 ring-white/70 backdrop-blur-sm md:p-3">
          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            {/* browser bar */}
            <div className="flex items-center gap-2 border-b border-line bg-canvas px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="ml-4 hidden rounded-md bg-white px-3 py-1 text-[11px] text-muted sm:block">app.collabspace.com/dashboard</span>
            </div>

            <div className="flex min-h-[340px] text-left">
              <aside className="hidden w-44 shrink-0 border-r border-line bg-canvas p-4 sm:block">
                <div className="space-y-1 text-xs font-medium text-muted">
                  <div className="flex items-center gap-2 rounded-lg bg-brand-light px-3 py-2 text-brand"><HomeIcon size={14} /> Overview</div>
                  <div className="flex items-center gap-2 px-3 py-2"><FileText size={14} /> My Documents</div>
                  <div className="flex items-center gap-2 px-3 py-2"><Users size={14} /> Shared</div>
                  <div className="flex items-center gap-2 px-3 py-2"><Star size={14} /> Favorites</div>
                  <div className="flex items-center gap-2 px-3 py-2"><LayoutTemplate size={14} /> Templates</div>
                </div>
              </aside>

              <div className="flex-1 p-5 md:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold">Good morning, Yashvi!</p>
                    <p className="text-xs text-muted">What are we creating today?</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Live
                    </span>
                    <div className="flex -space-x-2">
                      <Avatar initials="AB" color="blue" />
                      <Avatar initials="YA" color="pink" />
                      <Avatar initials="NB" color="slate" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {heroDocs.map(({ title, type, icon: Icon }, i) => (
                    <div key={title} className="rounded-xl border border-line bg-white p-4">
                      <div className="mb-3 space-y-1.5 rounded-lg bg-canvas p-3">
                        <div className={`h-2 w-2/3 rounded ${i === 1 ? "bg-pink/60" : "bg-brand/60"}`} />
                        <div className="h-1.5 w-full rounded bg-slate-200" />
                        <div className="h-1.5 w-4/5 rounded bg-slate-200" />
                        <div className="h-1.5 w-1/2 rounded bg-slate-200" />
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon size={14} className="mt-0.5 shrink-0 text-brand" />
                        <div>
                          <p className="text-xs font-semibold leading-snug">{title}</p>
                          <p className="text-[11px] text-muted">{type} · Edited 2h ago</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating cards, balanced on the bottom corners */}
        <div className="absolute -bottom-10 left-2 hidden w-48 rounded-2xl border border-white/80 bg-white p-3 shadow-xl shadow-slate-900/10 md:block lg:-left-6">
          <div className="grid aspect-video place-items-center rounded-lg bg-gradient-to-br from-brand to-pink text-[10px] font-bold text-white">Pitch Deck</div>
          <p className="mt-2 text-[11px] font-semibold">Startup Pitch Deck</p>
          <p className="text-[10px] text-muted">12 slides</p>
        </div>
        <div className="absolute -bottom-10 right-2 hidden w-56 rounded-2xl border border-white/80 bg-white p-3 shadow-xl shadow-slate-900/10 md:block lg:-right-6">
          <div className="flex items-center gap-2">
            <Avatar initials="AB" color="pink" size="h-6 w-6 text-[9px]" />
            <p className="text-[11px] font-semibold">Ananya</p>
            <MessageSquare size={12} className="ml-auto text-muted" />
          </div>
          <p className="mt-2 text-[11px] leading-snug text-muted">Can we add the system architecture diagram here?</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Features                                                            */
/* ------------------------------------------------------------------ */

const features = [
  { icon: Users, title: "Real-Time Collaboration", text: "Edit together and see every change as it happens." },
  { icon: LayoutTemplate, title: "Smart Templates", text: "Start from ready-made reports, decks, and docs.", accent: true },
  { icon: Presentation, title: "Reports & Presentations", text: "Write the report and build the slides in one place." },
  { icon: Share2, title: "Document Sharing", text: "Invite people as viewers or editors with one link." },
  { icon: History, title: "Version History", text: "Look back at any version and restore it in a click." },
  { icon: FolderKanban, title: "Project Workspaces", text: "Keep every file for a project together." },
];

function Features() {
  return (
    <section id="features" className="relative isolate scroll-mt-16 overflow-hidden bg-canvas py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 -z-10 h-80 w-80 rounded-full bg-pink/10 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-brand/10 blur-[100px]" />

      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">Everything you need to create together.</h2>
          <p className="mt-4 text-slate-600">One place for writing, presenting, and keeping your team on the same page.</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text, accent }) => (
            <div key={title} className="rounded-2xl border border-line bg-white/80 p-7 backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-xl hover:shadow-brand/10">
              <span className={`grid h-12 w-12 place-items-center rounded-xl ${accent ? "bg-pink-soft text-pink" : "bg-brand-light text-brand"}`}>
                <Icon size={22} />
              </span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Templates showcase                                                  */
/* ------------------------------------------------------------------ */

const templates = [
  {
    title: "College Project Report",
    tag: "Academic Report",
    thumb: (
      <div className="h-full rounded-md bg-white p-4 shadow-sm">
        <div className="mb-3 h-2.5 w-3/4 rounded bg-brand" />
        <div className="mb-4 h-1.5 w-1/3 rounded bg-slate-300" />
        <Lines n={5} />
      </div>
    ),
  },
  {
    title: "Startup Pitch Deck",
    tag: "Presentation",
    popular: true,
    thumb: (
      <div className="grid h-full place-items-center rounded-md bg-gradient-to-br from-brand to-pink p-4 text-center shadow-sm">
        <div>
          <div className="mx-auto h-2.5 w-24 rounded bg-white" />
          <div className="mx-auto mt-2 h-1.5 w-16 rounded bg-white/60" />
        </div>
      </div>
    ),
  },
  {
    title: "Software Documentation",
    tag: "Documentation",
    thumb: (
      <div className="flex h-full gap-3 rounded-md bg-white p-4 shadow-sm">
        <div className="w-1/4 space-y-1.5">
          <div className="h-1.5 rounded bg-brand/50" />
          <div className="h-1.5 rounded bg-slate-200" />
          <div className="h-1.5 rounded bg-slate-200" />
        </div>
        <div className="flex-1">
          <div className="mb-3 h-2.5 w-2/3 rounded bg-slate-800" />
          <div className="mb-2 h-8 rounded bg-slate-800/90" />
          <Lines n={3} />
        </div>
      </div>
    ),
  },
  {
    title: "Meeting Notes",
    tag: "Everyday Document",
    thumb: (
      <div className="h-full rounded-md bg-white p-4 shadow-sm">
        <div className="mb-3 h-2.5 w-1/2 rounded bg-slate-800" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="mb-2 flex items-center gap-2">
            <span className={`h-3 w-3 rounded border ${i === 0 ? "border-brand bg-brand" : "border-slate-300"}`} />
            <div className="h-1.5 flex-1 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    ),
  },
];

function TemplatesShowcase() {
  return (
    <section id="templates" className="scroll-mt-16 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">Start with a template. Finish something amazing.</h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((t) => (
            <Link to="/templates" key={t.title} className="group relative rounded-2xl border border-line bg-white p-3 transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-xl hover:shadow-brand/10">
              {t.popular && (
                <span className="absolute right-5 top-5 z-10 rounded-full bg-pink px-2.5 py-0.5 text-[10px] font-bold text-white">Popular</span>
              )}
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-brand-light to-pink-soft p-3">{t.thumb}</div>
              <div className="px-2 pb-2 pt-4">
                <h3 className="font-bold">{t.title}</h3>
                <span className="mt-2 inline-block rounded-full bg-brand-light px-2.5 py-0.5 text-xs font-medium text-brand">{t.tag}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/templates" className="inline-block rounded-xl border border-line bg-white px-6 py-3 text-sm font-semibold transition-colors hover:border-brand hover:text-brand">
            Explore All Templates
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

const steps = [
  {
    n: 1,
    title: "Choose a template.",
    text: "Pick a report, deck, or doc that fits your project.",
    snippet: (
      <div className="grid grid-cols-3 gap-2">
        {["bg-brand/20", "bg-pink/20", "bg-slate-200", "bg-slate-200", "bg-brand/20", "bg-slate-200"].map((c, i) => (
          <div key={i} className={`aspect-[3/4] rounded-md ${c} ${i === 1 ? "ring-2 ring-brand" : ""}`} />
        ))}
      </div>
    ),
  },
  {
    n: 2,
    title: "Invite your team.",
    text: "Add teammates by email as viewers or editors.",
    snippet: (
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg border border-line px-3 py-2 text-xs text-muted">
          teammate@college.edu <span className="rounded bg-brand px-2 py-0.5 font-semibold text-white">Invite</span>
        </div>
        <div className="flex -space-x-2">
          <Avatar initials="AB" />
          <Avatar initials="YA" color="pink" />
          <Avatar initials="AS" color="slate" />
          <Avatar initials="NB" color="sky" />
        </div>
      </div>
    ),
  },
  {
    n: 3,
    title: "Create together.",
    text: "Write at the same time and see each other's cursors.",
    snippet: (
      <div className="space-y-2.5 text-xs">
        <div className="h-1.5 w-full rounded bg-slate-200" />
        <div className="relative h-1.5 w-4/5 rounded bg-slate-200">
          <span className="absolute -top-1 left-3/4 h-3.5 w-0.5 bg-brand">
            <span className="absolute -top-4 left-0 whitespace-nowrap rounded bg-brand px-1.5 text-[9px] text-white">Ananya</span>
          </span>
        </div>
        <div className="relative h-1.5 w-2/3 rounded bg-slate-200">
          <span className="absolute -top-1 left-1/2 h-3.5 w-0.5 bg-pink">
            <span className="absolute -top-4 left-0 whitespace-nowrap rounded bg-pink px-1.5 text-[9px] text-white">Yashvi</span>
          </span>
        </div>
      </div>
    ),
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 bg-canvas py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">From idea to finished project in three steps.</h2>
        </div>

        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-5 hidden border-t-2 border-dashed border-line md:block" />
          {steps.map((s) => (
            <div key={s.n} className="relative text-center">
              <span className="relative mx-auto grid h-10 w-10 place-items-center rounded-full bg-brand text-sm font-bold text-white shadow-lg shadow-brand/30 ring-8 ring-canvas">{s.n}</span>
              <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm text-muted">{s.text}</p>
              <div className="mx-auto mt-6 max-w-xs rounded-2xl border border-line bg-white p-5 text-left shadow-sm">{s.snippet}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Collaboration section                                               */
/* ------------------------------------------------------------------ */

const collabPoints = [
  "See who is editing and where, live",
  "Comment on any line and resolve it together",
  "Every change is saved, with full version history",
];

function CollabSection() {
  return (
    <section id="about" className="relative isolate scroll-mt-16 overflow-hidden bg-white py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute right-[-10%] top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-pink/10 blur-[110px]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">Your entire team, in sync.</h2>
          <p className="mt-4 text-slate-600">Stop sending files back and forth. Work in one document and everyone always has the latest version.</p>
          <ul className="mt-8 space-y-4">
            {collabPoints.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm font-medium">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-light text-brand">
                  <Check size={13} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand/20 to-pink/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <p className="text-sm font-semibold">EventSphere Project Report</p>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> 3 online
                </span>
                <div className="flex -space-x-2">
                  <Avatar initials="AB" />
                  <Avatar initials="YA" color="pink" />
                  <Avatar initials="NB" color="slate" />
                </div>
              </div>
            </div>

            <div className="relative space-y-4 px-6 py-8 pr-24 sm:pr-32">
              <h4 className="text-lg font-bold">2. Introduction</h4>
              <p className="text-sm leading-relaxed text-muted">
                EventSphere helps college clubs plan events, manage members, and track attendance from a single dashboard.
              </p>
              <p className="relative text-sm leading-relaxed text-muted">
                The platform uses a MERN stack so every club can{" "}
                <span className="relative bg-brand/10">
                  publish events instantly
                  <span className="absolute -right-0.5 top-0 h-full w-0.5 bg-brand">
                    <span className="absolute -top-5 left-0 whitespace-nowrap rounded bg-brand px-1.5 py-0.5 text-[10px] font-semibold text-white">Ananya</span>
                  </span>
                </span>{" "}
                and notify members.
              </p>
              <p className="relative text-sm leading-relaxed text-muted">
                Role-based access keeps organiser and student views{" "}
                <span className="relative bg-pink/10">
                  separate and secure.
                  <span className="absolute -right-0.5 top-0 h-full w-0.5 bg-pink">
                    <span className="absolute -top-5 left-0 whitespace-nowrap rounded bg-pink px-1.5 py-0.5 text-[10px] font-semibold text-white">Yashvi</span>
                  </span>
                </span>
              </p>

              <div className="absolute right-3 top-24 w-24 rounded-lg border border-line bg-white p-2 shadow-md sm:right-4 sm:w-28">
                <div className="flex items-center gap-1">
                  <MessageSquare size={11} className="text-brand" />
                  <span className="text-[10px] font-semibold">Namish</span>
                </div>
                <p className="mt-1 text-[10px] leading-snug text-muted">Add a diagram here?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */

function FinalCTA() {
  return (
    <section className="bg-white px-5 pb-20 md:pb-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-brand via-brand-deep to-pink px-6 py-16 text-center md:py-24">
        <div aria-hidden className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
        <h2 className="relative mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white md:text-5xl">
          Your next great project starts here.
        </h2>
        <p className="relative mx-auto mt-4 max-w-lg text-white/80">Set up a workspace in under a minute and bring your team along.</p>
        <Link to="/register" className="relative mt-8 inline-block rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-brand shadow-xl transition-transform hover:scale-[1.03]">
          Create Your Workspace
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div className="min-h-screen scroll-smooth bg-white font-sans text-ink antialiased">
      <Navbar />
      {/* -mt-16 pulls the hero up behind the transparent navbar so the gradient runs edge to edge */}
      <main className="-mt-16">
        <Hero />
        <Features />
        <TemplatesShowcase />
        <HowItWorks />
        <CollabSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}