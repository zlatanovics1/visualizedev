"use client";

import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { createContext, useContext, useEffect } from "react";

interface DarkModeContextValues {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextValues | null>(null);

export default function DarkModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, toggleDarkMode] = useLocalStorageState(
    // window.matchMedia("prefers-color-scheme:dark").matches,
    true,
    "dark-mode"
  );
  const handleToggle = () => {
    toggleDarkMode((darkMode: boolean) => !darkMode);
  };

  useEffect(
    function () {
      if (darkMode) {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        window.matchMedia("prefers-color-scheme:dark");
      } else {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
      }
    },
    [darkMode]
  );

  return (
    <DarkModeContext.Provider
      value={{ darkMode, toggleDarkMode: handleToggle }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) throw new Error("DarkModeContext used outside ot its provider");
  return context;
}
