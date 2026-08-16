import { MessageCircle } from "lucide-react";

export const WA_LINK = "https://wa.me/56900000000";

export function WhatsAppFab() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cotiza gratis por WhatsApp"
      className="fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3 shadow-xl ring-1 ring-[var(--forest)]/10 transition-transform hover:scale-105 lg:right-6 lg:bottom-6"
    >
      <MessageCircle className="size-6 text-[var(--forest)]" strokeWidth={1.6} />
      <span className="hidden text-sm font-medium text-[var(--forest)] sm:inline">
        Cotiza gratis
      </span>
    </a>
  );
}
