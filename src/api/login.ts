import { Response } from "../hooks/useHeaders.ts";

export const login = (
  username: string,
  password: string,
): Promise<Response> => {
  return new Promise<Response>((resolve, reject) => {
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
      .then((res) => {
        if (res.ok) {
          return resolve(res.json());
        }
        throw new Error("Unable to login");
      })
      .catch((err) => reject(err));
  });
};
