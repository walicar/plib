import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthStatus = () => {
    // stateful logic
    const navigate = useNavigate();
    useEffect(() => {
        if (false) navigate("/login")
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