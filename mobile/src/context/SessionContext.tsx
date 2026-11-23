import { createContext, useContext, useEffect, useState } from "react";
import {
  api,
  login as entrarApi,
  logout as sairApi,
  token,
} from "@/services/api";
import type { Usuario } from "@/types/kinetic";
type Value = {
  user: Usuario | null;
  loading: boolean;
  login: (e: string, s: string) => Promise<void>;
  logout: () => Promise<void>;
};
const C = createContext<Value | null>(null);
export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        if (await token()) setUser(await api<Usuario>("GET", "/perfil"));
      } catch {
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <C.Provider
      value={{
        user,
        loading,
        login: async (e, s) => setUser(await entrarApi(e, s)),
        logout: async () => {
          await sairApi();
          setUser(null);
        },
      }}
    >
      {children}
    </C.Provider>
  );
}
export function useSession() {
  const v = useContext(C);
  if (!v) throw new Error("SessionProvider ausente");
  return v;
}
