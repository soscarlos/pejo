import { useContext } from "react";
import AuthorizationContext from "../components/contexts/AuthorizationContext";

const useAuthorization = () => {
    return useContext(AuthorizationContext);
}

export default useAuthorization;