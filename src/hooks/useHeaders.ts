import { useState } from "react";

export type Response = {
  accessToken: string;
  email: string;
  id: number;
  roles: string[];
  tokenType: string;
  username: string;
};

export type TenantsHook = {
  userData: Response;
  setUserData: (userData: Response) => void;
};

export const useHeaders = (): TenantsHook => {
  const [userData, setUserData] = useState<Response>({
    id: 0,
    accessToken: "",
    email: "",
    roles: [],
    username: "",
    tokenType: "",
  });

  const setDataInLocalStorage = (data: Response) => {
    localStorage.setItem("id", data.id.toString());
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("email", data.email);
    localStorage.setItem("username", data.username);

    setUserData(data);
  };

  return {
    userData,
    setUserData: setDataInLocalStorage,
  };
};
