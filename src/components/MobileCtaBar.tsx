import { MessageCircle, Phone } from "lucide-react";

import { TEL_LINK, waLink } from "@/config/site";

/**
 * Barra fija inferior solo para móvil: llamada directa + WhatsApp.
 * En escritorio se usa el botón flotante de WhatsApp.
 */
export function MobileCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-[var(--gold)]/30 bg-[var(--forest-deep)] shadow-[0_-4px_20px_rgba(0,0,0,0.25)] lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={TEL_LINK}
        className="flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-[var(--cream)] transition-colors active:bg-[var(--forest)]"
        aria-label="Llamar a Casa Tapiz"
      >
        <Phone className="size-4 text-[var(--gold)]" /> Llamar
      </a>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 border-l border-[var(--gold)]/30 bg-[var(--gold)] py-3.5 text-sm font-medium text-[var(--forest-deep)] transition-colors active:bg-[var(--gold-soft)]"
        aria-label="Escribir por WhatsApp a Casa Tapiz"
      >
        <MessageCircle className="size-4" /> WhatsApp
      </a>
    </div>
  );
}
