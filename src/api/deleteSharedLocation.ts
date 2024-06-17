export const deleteSharedLocation = (
    sender: string,
    reader: string,
): Promise<string> => {
    const token = localStorage.getItem("accessToken");

    return new Promise<string>((resolve, reject) => {
        fetch(
            `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_BASE_PORT}/api/app/deleteSharedLocation`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: token ? "Bearer " + token : "",
                },
                body: JSON.stringify({
                    sender: sender,
                    reader: reader,
                }),
            },
        )
            .then((res) => {
                if (res.ok) {
                    return resolve(res.json());
                }
                throw new Error("Unable to delete bi-directionally");
            })
            .catch((err) => reject(err));
    });
};
