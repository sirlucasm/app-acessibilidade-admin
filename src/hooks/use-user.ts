import { useEffect, useState } from "react";
import { firestore } from "../configs/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { User } from "../@types/user.type";

export const useUser = () => {
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
}
