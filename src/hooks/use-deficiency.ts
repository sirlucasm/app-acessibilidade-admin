import { useEffect, useState } from "react";
import { firestore } from "../configs/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Deficiency } from "../@types/deficiency.type";

export const useDeficiency = () => {
  const [deficiencies, setDeficiencies] = useState<Deficiency[] | undefined>();
  const [usersWithDeficiency, setUsersWithDeficiency] = useState<Deficiency[] | undefined>();
  const [usersWithoutDeficiency, setUsersWithoutDeficiency] = useState<Deficiency[] | undefined>();

  const deficienciesCollection = collection(firestore, 'deficiencies');
  const deficienciesRef = query(deficienciesCollection);

  useEffect(() => {
    const deficienciesUnsub = onSnapshot(deficienciesRef, (data) => {
      const deficienciesData: any[] = [];

      if (!data.empty) data.forEach(deficiency => deficienciesData.push({ ...deficiency.data(), id: deficiency.id }));
      setDeficiencies(deficienciesData);
      setUsersWithDeficiency(deficienciesData.filter((def) => !!def.data.length));
      setUsersWithoutDeficiency(deficienciesData.filter((def) => !def.data.length));
    });
    return () => {
      deficienciesUnsub();
    }
  }, [])

  return { deficiencies, usersWithDeficiency, usersWithoutDeficiency };
}
