import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { COMPANY } from "../config/company";

const VERTICALS = [
  { slug: "watches", label: "Watches" },
  { slug: "computers", label: "Computers" },
  { slug: "mobile", label: "Mobile" },
  { slug: "appliances", label: "Electronic Appliances" },
];

export default function Navbar() {
  const { user, logout, isApproved } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-ink text-paper border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-white rounded-lg px-2 py-1 flex items-center">
            <img src="/logo-mark.svg" alt={COMPANY.name} className="h-9 w-auto" />
          </div>
          <span className="font-display font-700 text-base tracking-tight hidden sm:inline">
            {COMPANY.name.toUpperCase()}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 font-mono text-sm uppercase tracking-wide">
          {VERTICALS.map((v) => (
            <Link key={v.slug} to={`/catalog?vertical=${v.slug}`} className="hover:text-copper-light transition">
              {v.label}
            </Link>
          ))}
          <Link to="/catalog" className="hover:text-copper-light transition">
            All products
          </Link>
          <Link to="/about" className="hover:text-copper-light transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-copper-light transition">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4 text-sm">
          {!user && (
            <>
              <Link to="/login" className="hover:text-copper-light transition">
                Sign in
              </Link>
              <Link
                to="/register"
                className="bg-copper hover:bg-copper-light text-ink font-medium px-4 py-2 rounded transition"
              >
                Apply for account
              </Link>
            </>
          )}

          {user && (
            <>
              <div className="hidden sm:flex flex-col items-end leading-tight">
                <span className="font-medium">{user.businessName}</span>
                <span
                  className={`font-mono text-xs ${
                    isApproved ? "text-teal" : "text-copper-light"
                  }`}
                >
                  {isApproved ? `Tier: ${user.pricingTier}` : "Pending approval"}
                </span>
              </div>
              {user.role === "admin" && (
                <Link to="/admin" className="hover:text-copper-light transition font-mono text-xs uppercase">
                  Admin
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="hover:text-copper-light transition"
              >
                Sign out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
