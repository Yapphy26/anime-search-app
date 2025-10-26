import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";

interface GlobalContextType {
  animeSearchHistory: string | null;
  setAnimeSearchHistory: Dispatch<SetStateAction<string | null>>;
  pageHistory: number | null;
  setPageHistory: Dispatch<SetStateAction<number | null>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  const [animeSearchHistory, setAnimeSearchHistory] = useState<string | null>(null);
  const [pageHistory, setPageHistory] = useState<number | null>(1);

  return (
    <GlobalContext.Provider value={{ animeSearchHistory, setAnimeSearchHistory, pageHistory, setPageHistory }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal(): GlobalContextType {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within an GlobalProvider");
  }
  return context;
}
