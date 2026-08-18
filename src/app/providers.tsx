"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QuoteModalProvider } from "@/context/QuoteModalContext";
import { QuoteInterceptor } from "@/components/sections/QuoteInterceptor";

const queryClient = new QueryClient();

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <QuoteModalProvider>
          <QuoteInterceptor />
          {children}
          <Toaster />
        </QuoteModalProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
