import { useCallback, useEffect, useState } from "react";
import { firestore } from "../configs/firebase";
import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { User } from "../@types/user.type";

export const useUsers = () => {
  const [users, setUsers] = useState<User[] | undefined>();

  const usersCollection = collection(firestore, 'users');
  const usersRef = query(usersCollection, orderBy("name", "asc"));

  useEffect(() => {
    const userUnsub = onSnapshot(usersRef, (data) => {
      const userData: any[] = [];

      if (!data.empty) data.forEach(user => userData.push({ ...user.data(), id: user.id }));
      setUsers(userData);
    });
    return () => {
      userUnsub();
    }
  }, [])

  return { users };
};

export const useUser = (uid: string) => {
  const [user, setUser] = useState<User | undefined>();

  const fetchUser = useCallback(async () => {
    const docRef = doc(firestore, 'users', uid);
    const res = await getDoc(docRef);

    setUser(res.data() as any);
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  return { user };
};
