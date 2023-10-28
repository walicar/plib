import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const useAuthStatus = () => {
    const navigate = useNavigate();
    const [cookies, ] = useCookies(["ExpiresAt"]);
    useEffect(() => {
        if (!cookies.ExpiresAt || isExpired(cookies.ExpiresAt)) {
            navigate('/login');
        }
    }, []);
  }

const isExpired = (timestamp: any) => {
    if (Date.now() > timestamp) {
        return true;
    } else {
        return false;
    }
}

export default useAuthStatus;