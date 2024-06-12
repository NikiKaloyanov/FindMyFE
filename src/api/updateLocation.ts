export const updateLocation = (
  username: string,
  longitude: string,
  latitude: string,
): Promise<string> => {
  const token = localStorage.getItem("accessToken");

  return new Promise<string>((resolve, reject) => {
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_BASE_PORT}/api/app/updateLocation`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: token ? "Bearer " + token : "",
        },
        body: JSON.stringify({
          username: username,
          longitude: longitude,
          latitude: latitude,
        }),
      },
    )
      .then((res) => {
        if (res.ok) {
          return resolve(res.json());
        }
        throw new Error("Unable to update location");
      })
      .catch((err) => reject(err));
  });
};
