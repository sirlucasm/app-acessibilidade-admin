import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useCallback, useMemo, useState } from "react"
import { LoginUser } from "../@types/user.type"
import { auth, firestore } from "../configs/firebase"

export const useAuth = () => {
  const getCurrentUser = useCallback(async () => {
    if (!auth.currentUser) return null;
    return await getUserData(auth.currentUser.uid)
  }, []);

  const signIn = useCallback(async ({ email, password }: LoginUser) => {
    let user;
    try {
      await setPersistence(auth, browserLocalPersistence)
      const loggedUser = await signInWithEmailAndPassword(auth, email, password);
      user = await getUserData(loggedUser.user.uid);
    } catch (error) {
      console.error(`[useAuth.signIn] Erro ao tentar autenticar usuário de email: ${email} | Detalhes ${JSON.stringify(error)}`)
      throw new Error('Credenciais incorretas');
    }
    return user;
  }, [])

  const getUserData = async (uid: string) => {
    let user;
    const docRef = doc(firestore, 'users', uid);
    try {
      const docSnap = await getDoc(docRef);
      user = docSnap.data();
      if (!user.admin) {
        console.error(`[useAuth.getUserData] Usuário de email: ${user.email} não é um Admin`);
        await signOut(auth);
        user = null;
      };

    } catch(error) {
      console.error(`[useAuth.getUserData] Houve um erro ao tentar buscar usuario com uid: ${uid} | Detalhes ${JSON.stringify(error)}`);
    }

    return user;
  }

  return { signIn, getCurrentUser, getUserData };
}