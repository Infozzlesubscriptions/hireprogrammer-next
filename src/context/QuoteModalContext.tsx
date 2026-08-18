"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { QuoteModal } from "@/components/sections/QuoteModal";

interface QuoteModalContextValue {
  openQuoteModal: (service?: string) => void;
}

const QuoteModalContext = createContext<QuoteModalContextValue>({ openQuoteModal: () => {} });

export function useQuoteModal() {
  return useContext(QuoteModalContext);
}

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [initialService, setInitialService] = useState<string | undefined>();

  const openQuoteModal = (service?: string) => {
    setInitialService(service);
    setOpen(true);
  };

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal }}>
      {children}
      <QuoteModal open={open} onClose={() => setOpen(false)} initialService={initialService} />
    </QuoteModalContext.Provider>
  );
}
