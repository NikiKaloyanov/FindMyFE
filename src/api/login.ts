export const login = (username: string, password: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_BASE_PORT}/api/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      },
    )
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};
