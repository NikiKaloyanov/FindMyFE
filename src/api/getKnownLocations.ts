import { UserLocation } from "../hooks/useUserData.ts";

export const getKnownLocations = (
  usernameCaller: string,
): Promise<Array<UserLocation>> => {
  const token = localStorage.getItem("accessToken");

  return new Promise<Array<UserLocation>>((resolve, reject) => {
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_BASE_PORT}/api/app/getKnownLocations`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: token ? "Bearer " + token : "",
        },
        body: JSON.stringify({
          caller: usernameCaller,
        }),
      },
    )
      .then((res) => {
        if (res.ok) {
          return resolve(res.json());
        }
        throw new Error("Unable to send pending locations request");
      })
      .catch((err) => reject(err));
  });
};
