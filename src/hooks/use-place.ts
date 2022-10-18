import { useEffect, useState } from "react";
import { Place } from "../@types/place.types";
import { firestore } from "../configs/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

export const usePlace = () => {
  const [places, setPlaces] = useState<Place[]>([]);

  const placesCollection = collection(firestore, 'places');
  const placesRef = query(placesCollection);

  useEffect(() => {
    const placeUnsub = onSnapshot(placesRef, (data) => {
      const placeData: any[] = [];

      if (!data.empty) data.forEach(place => placeData.push({ ...place.data(), id: place.id }));
      setPlaces(placeData);
    });
    return () => {
      placeUnsub();
    }
  }, [])

  return { places };
}
