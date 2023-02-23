import { useContext } from "react";
import CartContext from "../context/CardProvider";
import { UseCartContextType } from "../context/CardProvider";

const useCart = (): UseCartContextType => {
    return useContext(CartContext)
}

export default useCart