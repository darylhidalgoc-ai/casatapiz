import { ANALYTICS } from "@/config/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

let initialized = false;

function injectScript(src: string): void {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}

function initGa4(ga4Id: string): void {
  injectScript(`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`);
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", ga4Id, { send_page_view: false });
}

function initMetaPixel(pixelId: string): void {
  if (window.fbq) return;
  const queue: unknown[][] = [];
  const fbq = (...args: unknown[]) => {
    queue.push(args);
  };
  const stub = fbq as unknown as Record<string, unknown>;
  stub.queue = queue;
  stub.loaded = true;
  stub.version = "2.0";
  window.fbq = fbq;
  window._fbq = fbq;
  fbq("init", pixelId);
  injectScript("https://connect.facebook.net/en_US/fbevents.js");
}

/** Inicializa GA4 y/o Meta Pixel si hay IDs configurados. */
export function initAnalytics(): void {
  if (initialized || typeof window === "undefined" || typeof document === "undefined") return;
  initialized = true;

  if (ANALYTICS.ga4Id) initGa4(ANALYTICS.ga4Id);
  if (ANALYTICS.metaPixelId) initMetaPixel(ANALYTICS.metaPixelId);

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (href.includes("wa.me")) track("click_whatsapp");
      else if (href.startsWith("tel:")) track("click_llamar");
      else if (href.startsWith("mailto:")) track("click_email");
    },
    true,
  );
}

export function trackPageView(path: string): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", "page_view", { page_path: path });
  window.fbq?.("track", "PageView");
}

/** Registra un evento de conversión en GA4 y Meta Pixel. */
export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
  window.fbq?.("trackCustom", event, params);
}
