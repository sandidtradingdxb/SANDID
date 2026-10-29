// Single place to update company details — used in the footer, Contact page,
// WhatsApp links and anywhere else the business address/phone/email appears.
// Leave phoneTel / email empty ("") until you have them: the site then hides
// the phone, WhatsApp and email links instead of showing broken ones.
export const COMPANY = {
  name: "Sandid Electronics Trading LLC",
  shortName: "Sandid Trading",
  siteUrl: "", // e.g. "https://www.sandidtrading.com/" — shown in the Terms page when set
  addressLine1: "Building: Al Safi 1-204, Office C-62",
  city: "Al Mararr, Dubai",
  country: "United Arab Emirates",
  phoneDisplay: "", // e.g. "+971 50 123 4567"
  phoneTel: "", // digits with country code, e.g. "+971501234567" (used for tel: and wa.me)
  email: "", // e.g. "sales@yourdomain.com"
  currency: "AED",
};

export const waDigits = () => (COMPANY.phoneTel || "").replace(/\D/g, "");
export const waLink = (text) =>
  waDigits() ? `https://wa.me/${waDigits()}${text ? `?text=${encodeURIComponent(text)}` : ""}` : "";
