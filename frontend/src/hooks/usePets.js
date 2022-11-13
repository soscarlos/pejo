import { useContext } from "react";
import PetsContext from "../components/contexts/PetsContext";

const usePets = () => {
    return useContext(PetsContext);
}

export default usePets;