type Caller = {
  username: string;
};

export const getPendingLocations = (
  usernameCaller: string,
): Promise<Array<Caller>> => {
  const token = localStorage.getItem("accessToken");

  return new Promise<Array<Caller>>((resolve, reject) => {
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_BASE_PORT}/api/app/getPendingLocations`,
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
