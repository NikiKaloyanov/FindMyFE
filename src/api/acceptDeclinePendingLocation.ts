export const acceptDeclinePendingLocation = (
    usernameSender: string,
    usernameReader: string,
    decision: boolean,
): Promise<string> => {
    const token = localStorage.getItem("accessToken");

    return new Promise<string>((resolve, reject) => {
      fetch(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_BASE_PORT}/api/app/acceptDeclinePendingLocation`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: token ? "Bearer " + token : "",
          },
          body: JSON.stringify({
            sender: usernameSender,
            reader: usernameReader,
            decision: decision,
          }),
        },
      )
        .then((res) => {
          if (res.ok) {
            return resolve(res.json());
          }
          throw new Error("Unable to send pending locations answer");
        })
        .catch((err) => reject(err));
    });
};
