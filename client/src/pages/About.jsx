import { Link } from "react-router-dom";
import { COMPANY, waLink } from "../config/company";

const PILLARS = [
  {
    num: "01",
    title: "Sourced from Hong Kong & Singapore",
    body: "We source our products through trusted suppliers in Hong Kong and Singapore, which keeps supply consistent from one order to the next.",
  },
  {
    num: "02",
    title: "Export partner for USA, UK & Europe",
    body: "We work as a sourcing and export partner for customers across the USA, UK and European regions, with secure logistics.",
  },
  {
    num: "03",
    title: "Bulk & customised orders",
    body: "Competitive pricing on bulk orders, and customised orders tailored to your requirements across watches, computers, mobile phones and electronic appliances.",
  },
];

export default function About() {
  return (
    <div>
      <section className="bg-ink text-paper border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <p className="font-mono text-copper-light text-xs uppercase tracking-[0.2em] mb-4">About us</p>
          <h1 className="font-display font-700 text-4xl md:text-5xl leading-[1.1] max-w-2xl">
            An international trading company based in Dubai.
          </h1>
          <p className="mt-6 max-w-xl text-paper/70 text-lg">
            {COMPANY.name} specializes in the supply and distribution of watches, computers,
            mobile phones, and their spare parts and accessories.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {PILLARS.map((p) => (
            <div key={p.num}>
              <span className="font-mono text-xs text-copper">{p.num}</span>
              <h3 className="font-display font-600 text-lg mt-2 mb-2">{p.title}</h3>
              <p className="text-sm text-ink/70 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-ink/10 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="font-display font-600 text-2xl mb-4">Visit or reach us</h2>
            <p className="text-ink/70 leading-relaxed mb-6">
              Our office is in Al Mararr, Dubai. Trade buyers can request quotes directly
              through the catalogue or contact our team.
            </p>
            <dl className="space-y-4 font-mono text-sm">
              <div>
                <dt className="text-ink/50 uppercase text-xs mb-1">Address</dt>
                <dd>{COMPANY.addressLine1}</dd>
                <dd>{COMPANY.city}, {COMPANY.country}</dd>
              </div>
              {waLink() && (
                <div>
                  <dt className="text-ink/50 uppercase text-xs mb-1">WhatsApp</dt>
                  <dd>
                    <a href={waLink()} target="_blank" rel="noreferrer" className="hover:text-copper transition">
                      WhatsApp us →
                    </a>
                  </dd>
                </div>
              )}
            </dl>
            <Link
              to="/contact"
              className="inline-block mt-6 bg-copper hover:bg-copper-light text-ink font-medium px-5 py-3 rounded transition"
            >
              Get in touch
            </Link>
          </div>

          <div className="border border-ink/10 rounded p-6">
            <p className="font-mono text-xs uppercase text-ink/50 mb-4">How to get trade pricing</p>
            <ol className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="font-mono text-copper">1</span>
                <span>
                  <Link to="/register" className="text-copper hover:underline">Apply for an account</Link>{" "}
                  with your business details.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-copper">2</span>
                <span>Our team reviews the application.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-copper">3</span>
                <span>Once approved, prices and MOQs unlock across the catalogue and you can send quote requests.</span>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
