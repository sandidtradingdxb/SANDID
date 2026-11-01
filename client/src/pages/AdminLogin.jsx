import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { COMPANY } from "../config/company";

// Hidden admin sign-in. Not linked anywhere on the site — open /admin-login directly.
export default function AdminLogin() {
  const { user, login, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ask search engines not to index this page.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  if (!authLoading && user?.role === "admin") return <Navigate to="/admin" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const u = await login(form.email, form.password);
      if (u.role !== "admin") {
        logout();
        setError("This account does not have admin access.");
      } else {
        navigate("/admin");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <p className="font-mono text-xs uppercase text-copper tracking-widest mb-3">{COMPANY.name}</p>
      <h1 className="font-display font-700 text-3xl mb-2">Admin sign in</h1>
      <p className="text-ink/60 mb-8">Authorised staff only.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-mono text-xs uppercase text-ink/50">Email</label>
          <input
            type="email"
            required
            autoComplete="username"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-ink/20 rounded px-3 py-2 mt-1 focus:border-copper outline-none"
          />
        </div>
        <div>
          <label className="font-mono text-xs uppercase text-ink/50">Password</label>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-ink/20 rounded px-3 py-2 mt-1 focus:border-copper outline-none"
          />
        </div>

        {error && <p className="text-red-600 text-sm font-mono">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ink text-paper font-medium py-3 rounded hover:bg-ink/90 transition disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
