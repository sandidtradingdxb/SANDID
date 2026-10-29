import { COMPANY, waLink } from "../config/company";

// Floating "WhatsApp us" button, shown on every page once COMPANY.phoneTel is set.
export default function WhatsAppButton() {
  const href = waLink(`Hello ${COMPANY.shortName}, I would like to enquire about your products.`);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp us"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-medium text-sm px-4 py-3 rounded-full shadow-lg transition"
    >
      <svg viewBox="0 0 32 32" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.8 1 3.800 1.500 5.800 1.500 6.600 0 12-5.400 12-12S22.600 3 16 3zm0 21.800c-1.800 0-3.600-.5-5.100-1.400l-.4-.2-4.800.9.9-4.700-.3-.5C5.400 17.400 5 16.200 5 15c0-6.100 4.900-11 11-11s11 4.900 11 11-4.900 9.800-11 9.800zm6-8.200c-.3-.2-2-1-2.300-1.100-.3-.1-.5-.2-.7.200-.2.300-.8 1.100-1 1.300-.2.200-.4.200-.7.100-1.900-.9-3.100-1.700-4.300-3.700-.3-.5.300-.5.900-1.700.1-.2.100-.4 0-.5l-1-2.300c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400-.3.300-1.100 1.100-1.100 2.600s1.100 3 1.300 3.200c.2.200 2.200 3.400 5.300 4.700 2 .8 2.700.9 3.700.7.600-.1 2-.8 2.300-1.600.3-.8.300-1.500.2-1.600-.1-.2-.3-.3-.6-.4z"/>
      </svg>
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}
