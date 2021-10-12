import { BroadcastChannel } from "broadcast-channel";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";

type User = {
  email: string;
};

type AuthContextData = {
  signIn(): void;
  signOut: () => void;
  user: User | null;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  function signOut() {
    destroyCookie(undefined, "oncarAuth.token");
    setUser(null);
    authChannel.postMessage("signOut");
  }

  useEffect(() => {
    const { "oncarAuth.token": token } = parseCookies();
    if (token) {
      setUser({ email: "@" });
    }
  }, []);

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          signOut();
          break;
        case "signIn":
          setUser({ email: "@" });
          break;
        default:
          break;
      }
    };
  }, []);

  function signIn() {
    setCookie(undefined, "oncarAuth.token", "token", {
      maxAge: 60 * 60 * 25 * 30, // 30 days
      path: "/",
    });

    setUser({ email: "@" });

    authChannel.postMessage("signIn");
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
