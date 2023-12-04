import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const CartContext = createContext({});



export function CartContextProvider({ children }) {

    const [cartProducts, setCartProducts] = useState([]);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);

    useEffect(() => {
        const cartData = Cookies.get('cart');
        if (cartData) {
            setCartProducts(JSON.parse(cartData));
        }

    }, [])

    useEffect(() => {
        if (cartProducts?.length > 0) {
            Cookies.set('cart', JSON.stringify(cartProducts), { expires: 1 });
        }
    }, [cartProducts]);


    function clearCookies () {
        Cookies.remove('cart');
        setCartProducts([])
    }

    function addProduct(productId) {
        setCartProducts((prev) => [...prev, productId]);
    }

    function totalPrice() {
        setCartTotalPrice((prev => !prev))
    }


    function removeProduct(productId) {
        setCartProducts((prev) => {
            const indexOfProduct = prev.indexOf(productId);
            if (indexOfProduct !== -1) {
                return prev.filter((value, index) => index !== indexOfProduct);
            }
            return prev;
        });
    }



    return (
        <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, setCartTotalPrice, clearCookies, cartTotalPrice, totalPrice }}>
            {children}
        </CartContext.Provider>
    );



}


