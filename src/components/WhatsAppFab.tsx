import { MessageCircle } from "lucide-react";

import { waLink } from "@/config/site";

export const WA_LINK = waLink();

export function WhatsAppFab() {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cotiza gratis por WhatsApp"
      className="fixed right-6 bottom-6 z-50 hidden items-center gap-2 rounded-full border border-border bg-card px-4 py-3 shadow-xl ring-1 ring-[var(--forest)]/10 transition-transform hover:scale-105 lg:inline-flex"
    >
      <MessageCircle className="size-6 text-[var(--forest)]" strokeWidth={1.6} />
      <span className="text-sm font-medium text-[var(--forest)]">Cotiza gratis</span>
    </a>
  );
}
