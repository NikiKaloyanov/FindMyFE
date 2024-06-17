import { Dispatch, SetStateAction, useState } from "react";

export type UserLocation = {
  username: string;
  latitude: number;
  longitude: number;
  message: string;
};

export type UserDataHook = {
  pendingLocations: Array<string>;
  setPendingLocations: Dispatch<SetStateAction<string[]>>;
  knownLocations: Array<UserLocation>;
  setKnownLocations: Dispatch<SetStateAction<UserLocation[]>>;
  removeFromPending: (username: string) => void;
  getInitials: (name: string) => string;
  removeFromKnownLocations: (username: string) => void;
  distanceInKmBetweenEarthCoordinates: (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => number;
};

export const useUserData = (): UserDataHook => {
  const [pendingLocations, setPendingLocations] = useState<Array<string>>([]),
    [knownLocations, setKnownLocations] = useState<Array<UserLocation>>([]);

  const removeFromPending = (username: string) => {
    let temp = pendingLocations;
    const index = pendingLocations.indexOf(username);
    if (index > -1) {
      temp = pendingLocations.splice(index, 1);
    }
    setPendingLocations(temp);
  };

  const removeFromKnownLocations = (username: string) => {
    let temp = knownLocations;
    const indexOfUser = knownLocations.find((it) => it.username === username)!;
    const index = knownLocations.indexOf(indexOfUser);
    if (index > -1) {
      temp = knownLocations.splice(index, 1);
    }
    setKnownLocations(temp);
  };

  const getInitials = (username: string): string => {
    const uppercaseLetters = username.replace(/[^A-Z]+/g, "");
    if (uppercaseLetters) {
      return uppercaseLetters.slice(0, 2);
    }
    return username.slice(0, 2).toUpperCase();
  };

  const degreesToRadians = (degrees: number) => {
    return (degrees * Math.PI) / 180;
  };

  const distanceInKmBetweenEarthCoordinates = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const earthRadiusKm = 6371;

    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  };

  return {
    pendingLocations,
    setPendingLocations,
    knownLocations,
    setKnownLocations,
    removeFromPending,
    getInitials,
    removeFromKnownLocations,
    distanceInKmBetweenEarthCoordinates,
  };
};
