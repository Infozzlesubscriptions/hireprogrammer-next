"use client";

import { useEffect } from "react";
import { useQuoteModal } from "@/context/QuoteModalContext";

export function QuoteInterceptor() {
  const { openQuoteModal } = useQuoteModal();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href === "/quote") {
        e.preventDefault();
        openQuoteModal();
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [openQuoteModal]);

  return null;
}
