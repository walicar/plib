import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const useAuthStatus = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["ExpiresAt"]);
  useEffect(() => {
    if (!cookies.ExpiresAt || Date.now() / 1000 >= cookies.ExpiresAt) {
      navigate("/login");
    }
  }, []);
};

export default useAuthStatus;
