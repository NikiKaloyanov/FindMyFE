export const register = (
  name: string,
  email: string,
  password: string,
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_BASE_PORT}/api/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      },
    )
      .then((res) => {
        if (res.ok) {
          return resolve(res.json());
        }
        throw new Error("Unable to sign up");
      })
      .catch((err) => reject(err));
  });
};
