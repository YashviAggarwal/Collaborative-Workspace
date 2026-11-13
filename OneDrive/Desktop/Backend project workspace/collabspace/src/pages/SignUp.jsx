
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Check,
  FileText,
  Presentation,
} from "lucide-react";
import Logo from "../components/common/Logo";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [agreed, setAgreed] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validate = (name, value, all = form) => {
    switch (name) {
      case "name":
        return value.trim().length < 2
          ? "Enter your full name."
          : "";

      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
          ? ""
          : "Enter a valid email address.";

      case "password":
        return value.length < 8 ||
          !/[A-Za-z]/.test(value) ||
          !/\d/.test(value)
          ? "Use at least 8 characters with a letter and a number."
          : "";

      case "confirm":
        return value !== all.password
          ? "Passwords don't match."
          : "";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };

    setForm(next);
    setServerError("");

    setErrors((er) => ({
      ...er,
      ...(er[name] !== undefined
        ? { [name]: validate(name, value, next) }
        : {}),
      ...(name === "password" && er.confirm !== undefined
        ? { confirm: validate("confirm", next.confirm, next) }
        : {}),
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setErrors((er) => ({
      ...er,
      [name]: validate(name, value),
    }));
  };

  // REAL BACKEND SIGNUP
  const handleSubmit = async (e) => {
    e.preventDefault();

    const found = {
      name: validate("name", form.name),
      email: validate("email", form.email),
      password: validate("password", form.password),
      confirm: validate("confirm", form.confirm),
      terms: agreed
        ? ""
        : "Please accept the terms to continue.",
    };

    setErrors(found);
    setServerError("");

    if (Object.values(found).some(Boolean)) return;

    try {
      setSubmitting(true);

      await signup(
        form.name.trim(),
        form.email.trim().toLowerCase(),
        form.password
      );

      // AuthContext stores the JWT and user automatically
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setServerError(
        error.message || "Account creation failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const rules = [
    {
      label: "At least 8 characters",
      ok: form.password.length >= 8,
    },
    {
      label: "Contains a letter",
      ok: /[A-Za-z]/.test(form.password),
    },
    {
      label: "Contains a number",
      ok: /\d/.test(form.password),
    },
  ];

  const inputClass = (error) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:ring-4 ${
      error
        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
        : "border-line focus:border-brand focus:ring-brand/15"
    }`;

  return (
    <div className="grid min-h-screen bg-white font-sans text-ink antialiased lg:grid-cols-2">

      {/* Form side */}
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <div className="w-fit">
          <Logo />
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-muted">
            Start your workspace. It takes less than a minute.
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-8 space-y-5"
          >

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-semibold"
              >
                Full name
              </label>

              <input
                id="name"
                name="name"
                autoComplete="name"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass(errors.name)}
              />

              {errors.name && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@college.edu"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass(errors.email)}
              />

              {errors.email && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputClass(errors.password)} pr-11`}
                />

                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink"
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.password}
                </p>
              )}

              <ul className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
                {rules.map((r) => (
                  <li
                    key={r.label}
                    className={`flex items-center gap-1 text-xs font-medium ${
                      r.ok ? "text-emerald-600" : "text-slate-400"
                    }`}
                  >
                    <Check size={12} strokeWidth={3} />
                    {r.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="confirm"
                className="mb-1.5 block text-sm font-semibold"
              >
                Confirm password
              </label>

              <div className="relative">
                <input
                  id="confirm"
                  name="confirm"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={form.confirm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputClass(errors.confirm)} pr-11`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-ink"
                >
                  {showConfirm ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.confirm && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.confirm}
                </p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);

                    if (e.target.checked) {
                      setErrors((er) => ({
                        ...er,
                        terms: "",
                      }));
                    }
                  }}
                  className="mt-0.5 h-4 w-4 rounded border-line accent-brand"
                />

                <span>
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="font-semibold text-brand"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="font-semibold text-brand"
                  >
                    Privacy Policy
                  </Link>.
                </span>
              </label>

              {errors.terms && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.terms}
                </p>
              )}
            </div>

            {/* Backend error */}
            {serverError && (
              <div className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600">
                {serverError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-colors hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting && (
                <Loader2 size={16} className="animate-spin" />
              )}

              {submitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-brand hover:text-brand-deep"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Brand side */}
      <div className="relative isolate hidden overflow-hidden bg-white lg:block">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-120px] h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-brand/55 blur-[110px]" />
          <div className="absolute bottom-[-100px] left-[-120px] h-[420px] w-[480px] rounded-full bg-sky-300/60 blur-[110px]" />
          <div className="absolute bottom-[-60px] right-[-120px] h-[460px] w-[520px] rounded-full bg-pink/45 blur-[110px]" />
        </div>

        <div className="flex h-full flex-col items-center justify-center px-12 text-center">
          <h2 className="max-w-md text-4xl font-extrabold leading-tight tracking-tight">
            Your next great project starts here.
          </h2>

          <p className="mt-4 max-w-sm text-slate-600">
            Create reports, decks, and docs from templates and invite your team in one click.
          </p>

          <div className="mt-12 w-full max-w-sm rounded-3xl bg-white/50 p-2.5 ring-1 ring-white/70 backdrop-blur-sm">
            <div className="rounded-2xl border border-line bg-white p-5 text-left shadow-xl shadow-brand/10">
              <p className="text-sm font-bold">
                Start from a template
              </p>

              <div className="mt-4 space-y-3">
                {[
                  {
                    icon: FileText,
                    name: "College Project Report",
                    meta: "Academic Report",
                  },
                  {
                    icon: Presentation,
                    name: "Startup Pitch Deck",
                    meta: "Presentation",
                  },
                ].map(({ icon: Icon, name, meta }) => (
                  <div
                    key={name}
                    className="flex items-center gap-3 rounded-xl border border-line p-3"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-light text-brand">
                      <Icon size={17} />
                    </span>

                    <div>
                      <p className="text-xs font-semibold">{name}</p>
                      <p className="text-[11px] text-muted">{meta}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
