import { useEffect } from "react";
import { login } from "../../api/login.ts";
import { useHooksContext } from "../../hooks/useHooksContext.tsx";
import { useNavigate } from "react-router-dom";

const SSOTransitionPage = () => {
  const { headersHook } = useHooksContext(),
    navigate = useNavigate();

  useEffect(() => {
    login("Nikolai Kaloianov", "erikul1994@gmail.com").then((data) => {
      headersHook.setUserData(data);
      navigate("/app");
    });
  });

  return <></>;
};

export default SSOTransitionPage;
