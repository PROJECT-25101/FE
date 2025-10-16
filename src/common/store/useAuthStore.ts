import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useShallow } from "zustand/shallow";
import type { IUser } from "../types/User";

interface AuthState {
  user: IUser | null;
  token: string | null;
  isLogged: boolean;
  login: (token: string, user: IUser | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        isLogged: false,
        login: (token, user) => set({ user, token, isLogged: true }),
        logout: () => set({ user: null, token: null, isLogged: false }),
      }),
      { name: "auth-storage" },
    ),
    { name: "AuthStore" },
  ),
);

export const useAuthSelector = <T>(selector: (state: AuthState) => T): T =>
  useAuthStore(useShallow(selector));
