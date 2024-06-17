export const setMessage = (
  username: string,
  message: string,
): Promise<string> => {
  const token = localStorage.getItem("accessToken");

  return new Promise<string>((resolve, reject) => {
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_BASE_PORT}/api/app/setMessage`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: token ? "Bearer " + token : "",
        },
        body: JSON.stringify({
          user: username,
          message: message,
        }),
      },
    )
      .then((res) => {
        if (res.ok) {
          return resolve(res.json());
        }
        throw new Error("Unable to send message");
      })
      .catch((err) => reject(err));
  });
};
