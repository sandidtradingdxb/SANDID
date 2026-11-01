import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import ProductCard from "../components/ProductCard";
import { COMPANY, waLink } from "../config/company";

const Icon = {
  watches: (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 6h14l2 8H15zM17 42h14l2-8H15z" />
      <circle cx="24" cy="24" r="11" />
      <path d="M24 18v6l4 3" />
    </svg>
  ),
  computers: (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="11" width="30" height="21" rx="2" />
      <path d="M4 38h40l-3-6H7z" />
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="5" width="20" height="38" rx="4" />
      <path d="M21 38h6" />
    </svg>
  ),
  appliances: (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="12" width="36" height="24" rx="3" />
      <rect x="11" y="17" width="18" height="14" rx="1" />
      <circle cx="35" cy="20" r="1.5" />
      <path d="M33 27h4M33 31h4" />
    </svg>
  ),
};

const CATEGORIES = [
  { slug: "watches", label: "Watches", desc: "All categories of watches, plus spare parts and accessories." },
  { slug: "computers", label: "Computers", desc: "Computers and peripherals, plus spare parts and accessories." },
  { slug: "mobile", label: "Mobile Phones", desc: "All major brands, plus spare parts and accessories." },
  { slug: "appliances", label: "Electronic Appliances", desc: "Electronic appliances and parts for trade buyers." },
];

const WHY = [
  { title: "Reliable sourcing partner", body: "We source from Hong Kong and Singapore and export to customers across the USA, UK and Europe." },
  { title: "Secure logistics", body: "Careful handling and secure shipping arrangements from Dubai to your destination." },
  { title: "Competitive pricing", body: "Tiered bulk pricing on every listing, unlocked once your trade account is approved." },
  { title: "Bulk & customised orders", body: "Tell us what you need. We handle bulk quantities and customised orders." },
];

const STEPS = [
  { title: "Apply", body: "Create a trade account with your business details." },
  { title: "Get approved", body: "Our team reviews your application and unlocks prices." },
  { title: "Request a quote", body: "Pick products and quantities, then send a quote request." },
  { title: "Receive an invoice", body: "We confirm pricing and send you an invoice." },
  { title: "Shipment", body: "Once payment is confirmed, we arrange secure shipping." },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api
      .get("/products?limit=8")
      .then((res) => setFeatured(res.data.products.filter((p) => p)))
      .catch(() => {});
  }, []);

  const wa = waLink(`Hello ${COMPANY.shortName}, I would like to enquire about your products.`);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-paper border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <p className="font-mono text-copper text-xs uppercase tracking-[0.2em] mb-4">
              Dubai, UAE · International trading company
            </p>
            <h1 className="font-display font-700 text-4xl md:text-5xl text-ink leading-[1.08]">
              Watches, computers &amp; mobile phones, sourced from Hong Kong and Singapore.
            </h1>
            <p className="mt-6 max-w-xl text-ink/70 text-lg leading-relaxed">
              {COMPANY.name} supplies and distributes watches, computers, mobile phones and
              electronic appliances, with their spare parts and accessories, to buyers in the
              USA, UK and Europe.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/catalog" className="bg-ink hover:bg-ink/90 text-white font-medium px-6 py-3 rounded transition">
                Browse catalogue
              </Link>
              {wa && (
                <a href={wa} target="_blank" rel="noreferrer" className="bg-copper hover:bg-copper-light text-white font-medium px-6 py-3 rounded transition">
                  WhatsApp us
                </a>
              )}
              <Link to="/register" className="border border-ink/25 hover:border-copper text-ink px-6 py-3 rounded transition">
                Apply for a trade account
              </Link>
            </div>
          </div>

          <div className="bg-white border border-ink/10 rounded-lg shadow-sm p-8">
            <img src="/logo.png" alt={COMPANY.name} className="h-40 w-auto mx-auto mb-6" />
            <dl className="grid grid-cols-3 gap-4 text-center border-t border-ink/10 pt-6">
              <div>
                <dt className="font-mono text-[11px] uppercase text-ink/50">Based in</dt>
                <dd className="font-display font-600 text-ink mt-1">Dubai</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase text-ink/50">Sourcing</dt>
                <dd className="font-display font-600 text-ink mt-1">HK &amp; Singapore</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase text-ink/50">Exporting to</dt>
                <dd className="font-display font-600 text-ink mt-1">USA · UK · EU</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase text-copper tracking-widest mb-2">Our business activities</p>
          <h2 className="font-display font-600 text-3xl text-ink">Browse by category</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/catalog?vertical=${c.slug}`}
              className="group border border-ink/10 rounded-lg p-6 bg-white hover:border-copper hover:shadow-md transition"
            >
              <div className="text-copper mb-4">{Icon[c.slug]}</div>
              <h3 className="font-display font-600 text-lg text-ink group-hover:text-copper transition">{c.label}</h3>
              <p className="text-sm text-ink/60 mt-2 leading-relaxed">{c.desc}</p>
              <span className="inline-block mt-4 font-mono text-xs uppercase text-ink/50 group-hover:text-copper transition">
                View catalogue →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* About + why us */}
      <section className="bg-paper border-y border-ink/10">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="font-mono text-xs uppercase text-copper tracking-widest mb-2">Company profile</p>
            <h2 className="font-display font-600 text-3xl text-ink mb-5">Who we are</h2>
            <p className="text-ink/70 leading-relaxed mb-4">
              {COMPANY.name} is an international trading company specializing in the supply and
              distribution of watches, computers, mobile phones, and their spare parts and
              accessories. We operate as a reliable sourcing and export partner, serving
              customers across the USA, UK, and European regions.
            </p>
            <p className="text-ink/70 leading-relaxed mb-6">
              Our company is committed to delivering high-quality products with secure
              logistics, competitive pricing, and guaranteed customer satisfaction.
            </p>
            <Link to="/about" className="text-copper font-medium hover:underline">
              More about us →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY.map((w) => (
              <div key={w.title} className="bg-white border border-ink/10 rounded-lg p-5">
                <div className="w-8 h-1 bg-copper mb-3" />
                <h3 className="font-display font-600 text-ink mb-1">{w.title}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing band */}
      <section className="bg-ink text-paper">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <p className="font-mono text-copper-light text-xs uppercase tracking-widest mb-3">Global supply chain</p>
          <h2 className="font-display font-600 text-3xl mb-8 max-w-2xl">
            Sourced from Hong Kong and Singapore. Delivered to the USA, UK and Europe.
          </h2>
          <div className="flex flex-col md:flex-row items-stretch gap-4 text-center">
            {[
              { k: "Source", v: "Hong Kong · Singapore" },
              { k: "Hub", v: "Dubai, UAE" },
              { k: "Export to", v: "USA · UK · Europe" },
            ].map((s, i) => (
              <div key={s.k} className="flex items-center gap-4 md:flex-1">
                <div className="flex-1 border border-white/20 rounded-lg px-4 py-5">
                  <p className="font-mono text-[11px] uppercase text-copper-light">{s.k}</p>
                  <p className="font-display font-600 text-lg mt-1">{s.v}</p>
                </div>
                {i < 2 && <span className="hidden md:block text-copper-light text-2xl">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How ordering works */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-8">
          <p className="font-mono text-xs uppercase text-copper tracking-widest mb-2">How ordering works</p>
          <h2 className="font-display font-600 text-3xl text-ink">From quote to shipment</h2>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-5 gap-5">
          {STEPS.map((s, i) => (
            <li key={s.title} className="border-t-2 border-copper pt-4">
              <span className="font-mono text-xs text-copper">0{i + 1}</span>
              <h3 className="font-display font-600 text-ink mt-1">{s.title}</h3>
              <p className="text-sm text-ink/60 mt-1 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="bg-paper border-t border-ink/10">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-display font-600 text-2xl text-ink">Featured products</h2>
              <Link to="/catalog" className="font-mono text-xs uppercase text-copper hover:underline">
                View full catalogue →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to action */}
      <section className="bg-ink text-paper">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="font-display font-600 text-3xl mb-3">Need bulk or customised orders?</h2>
          <p className="text-paper/70 mb-8">Tell us what you need and we will send you a quote.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="bg-copper hover:bg-copper-light text-white font-medium px-6 py-3 rounded transition">
              Contact us
            </Link>
            {wa && (
              <a href={wa} target="_blank" rel="noreferrer" className="border border-white/30 hover:border-copper-light px-6 py-3 rounded transition">
                WhatsApp {COMPANY.phoneDisplay || ""}
              </a>
            )}
          </div>
          {COMPANY.email && <p className="font-mono text-sm text-paper/60 mt-6">{COMPANY.email}</p>}
          <p className="font-mono text-xs text-paper/40 mt-2">{COMPANY.addressLine1}, {COMPANY.city}, {COMPANY.country}</p>
        </div>
      </section>
    </div>
  );
}
