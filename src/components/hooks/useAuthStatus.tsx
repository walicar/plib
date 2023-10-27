import useLocalStorageState from "use-local-storage-state";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthStatus = () => {
    // stateful loigic
    const [token, , { removeItem }] = useLocalStorageState("token");
    const navigate = useNavigate();
    useEffect(() => {
        if (!token || !isExpired(token as Token)) {
            if (token) {
                removeItem();
            }
            navigate("/login");
        }
    }, []);
  }

const isExpired = (token:Token) => {
    if (Date.now() > token.exp) {
        return true;
    } else {
        return false;
    }
}

export default useAuthStatus;