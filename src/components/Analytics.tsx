import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

import { initAnalytics, trackPageView } from "@/lib/analytics";

/**
 * Carga GA4 / Meta Pixel (si hay IDs configurados) y registra una vista de
 * página en cada cambio de ruta del sitio.
 */
export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
}
