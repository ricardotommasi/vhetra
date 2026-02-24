"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type TransitionContextValue = {
  isExiting: boolean;
  setExiting: (exiting: boolean) => void;
  startTransition: () => Promise<void>;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isExiting, setExiting] = useState(false);

  const startTransition = useCallback(() => {
    return new Promise<void>((resolve) => {
      setExiting(true);
      setTimeout(() => {
        setExiting(false);
        resolve();
      }, 1000);
    });
  }, []);

  return (
    <TransitionContext.Provider
      value={{ isExiting, setExiting, startTransition }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useTransition must be used within TransitionProvider");
  return ctx;
}
