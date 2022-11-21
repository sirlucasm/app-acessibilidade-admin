import { useEffect, useState, useCallback } from "react";
import { Place } from "../@types/place.types";
import { firestore } from "../configs/firebase";
import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";

export const usePlaces = () => {
  const [places, setPlaces] = useState<Place[] | undefined>();

  const placesCollection = collection(firestore, 'places');
  const placesRef = query(placesCollection, orderBy("title", "asc"));

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

export const usePlace = (id: string) => {
  const [place, setPlace] = useState<Place | undefined>();

  const fetchPlace = useCallback(async () => {
    const docRef = doc(firestore, 'places', id);
    const res = await getDoc(docRef);
    const place: any = {
      ...res.data(),
      id: res.id
    };

    setPlace(place);
  }, []);

  useEffect(() => {
    fetchPlace();
  }, []);

  return { place };
};
