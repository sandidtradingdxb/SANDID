import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import ProductCard from "../components/ProductCard";
import { COMPANY } from "../config/company";

const VERTICAL_INFO = [
  { slug: "watches", label: "Watches", desc: "All categories, plus spare parts and accessories" },
  { slug: "computers", label: "Computers", desc: "Computers and peripherals, plus spare parts and accessories" },
  { slug: "mobile", label: "Mobile Phones", desc: "All major brands, plus spare parts and accessories" },
  { slug: "appliances", label: "Electronic Appliances", desc: "Electronic appliances for trade buyers" },
];

const REGIONS = ["USA", "United Kingdom", "Europe"];

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api
      .get("/products?limit=8")
      .then((res) => setFeatured(res.data.products.filter((p) => p)))
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-ink text-paper border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <p className="font-mono text-copper-light text-xs uppercase tracking-[0.2em] mb-4">
            Dubai, UAE · International trading company
          </p>
          <h1 className="font-display font-700 text-4xl md:text-6xl leading-[1.05] max-w-3xl">
            Watches, computers &amp; mobile phones — sourced from Hong Kong and China.
          </h1>
          <p className="mt-6 max-w-xl text-paper/70 text-lg">
            {COMPANY.name} supplies and distributes watches, computers, mobile phones and
            their spare parts and accessories to buyers in the USA, UK and Europe.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/catalog" className="bg-copper hover:bg-copper-light text-ink font-medium px-6 py-3 rounded transition">
              Browse catalogue
            </Link>
            <Link to="/register" className="border border-paper/30 hover:border-copper-light px-6 py-3 rounded transition">
              Apply for a trade account
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {VERTICAL_INFO.map((v, i) => (
              <Link
                key={v.slug}
                to={`/catalog?vertical=${v.slug}`}
                className={`px-6 py-6 hover:bg-white/5 transition ${i > 0 ? "lg:border-l border-white/10" : ""}`}
              >
                <span className="font-mono text-xs text-copper-light">0{i + 1}</span>
                <h3 className="font-display font-600 text-xl mt-1">{v.label}</h3>
                <p className="text-sm text-paper/60 mt-1">{v.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Company profile */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="font-mono text-xs uppercase text-copper tracking-widest mb-3">Company profile</p>
          <h2 className="font-display font-600 text-3xl mb-5">Who we are</h2>
          <p className="text-ink/70 leading-relaxed mb-4">
            {COMPANY.name} is an international trading company specializing in the supply and
            distribution of watches, computers, mobile phones, and their spare parts and
            accessories. We operate as a reliable sourcing and export partner, serving customers
            across the USA, UK, and European regions.
          </p>
          <p className="text-ink/70 leading-relaxed mb-6">
            Our company is committed to delivering high-quality products with secure logistics,
            competitive pricing, and guaranteed customer satisfaction.
          </p>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((r) => (
              <span key={r} className="font-mono text-xs border border-ink/15 rounded-full px-3 py-1">
                {r}
              </span>
            ))}
          </div>
        </div>

        <div className="border border-ink/10 bg-white rounded p-6">
          <p className="font-mono text-xs uppercase text-ink/50 mb-4">Our business activities</p>
          <ul className="space-y-3 text-sm text-ink/80">
            <li><strong>Watches:</strong> supply of all categories of watches, including spare parts and accessories.</li>
            <li><strong>Computers:</strong> computers and peripherals, including spare parts and accessories.</li>
            <li><strong>Mobile phones:</strong> all major brands, including spare parts and accessories.</li>
            <li><strong>Electronic appliances:</strong> electronic appliances for trade buyers.</li>
            <li><strong>Bulk &amp; customised orders:</strong> tailored to your requirements.</li>
          </ul>
          <p className="font-mono text-xs uppercase text-ink/50 mt-6 mb-2">Sourcing</p>
          <p className="text-sm text-ink/80 leading-relaxed">
            We source from Hong Kong and China — all products are of Chinese and Hong Kong
            origin — keeping supply consistent from one order to the next.
          </p>
        </div>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="border-t border-ink/10 bg-white">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-display font-600 text-2xl">Featured products</h2>
              <Link to="/catalog" className="font-mono text-xs uppercase text-teal hover:text-copper transition">
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
    </div>
  );
}
