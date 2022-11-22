import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { LoginUser } from "../@types/user.type";
import { auth } from "../configs/firebase";
import { useAuth } from "../hooks/use-auth";

export interface AuthContextTypes {
  currentUser: any | null;
}

const AuthContext = createContext({} as AuthContextTypes);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { getCurrentUser, getUserData } = useAuth()
  const [currentUser, setCurrentUser] = useState();
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (router.pathname === '/') router.replace('/app');
        if (router.pathname === '/esqueci-senha') router.replace('/app');
        setCurrentUser(await getUserData(user.uid))
      } else if (
        router.pathname !== '/esqueci-senha'
      ) {
        router.replace('/');
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, }}>
      { children }
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
