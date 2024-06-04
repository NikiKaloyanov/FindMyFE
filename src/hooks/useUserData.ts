import { Dispatch, SetStateAction, useState } from "react";

export type UserLocation = {
  username: string;
  latitude: number;
  longitude: number;
};

export type UserDataHook = {
  pendingLocations: Array<string>;
  setPendingLocations: Dispatch<SetStateAction<string[]>>;
  knownLocations: Array<UserLocation>;
  setKnownLocations: Dispatch<SetStateAction<UserLocation[]>>;
  removeFromPending: (username: string) => void;
  getInitials: (name: string) => string;
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

  const getInitials = (username: string): string => {
    const uppercaseLetters = username.replace(/[^A-Z]+/g, "");
    if (uppercaseLetters) {
      return uppercaseLetters.slice(0, 2);
    }
    return username.slice(0, 2).toUpperCase();
  };

  return {
    pendingLocations,
    setPendingLocations,
    knownLocations,
    setKnownLocations,
    removeFromPending,
    getInitials,
  };
};
