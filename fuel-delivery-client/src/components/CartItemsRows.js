import { useContext } from "react";
import { CartContext } from "../contexts/CartContext"


export default function CartItemsRows ({cartProduct}) {

    const { cartProducts, addProduct, removeProduct} = useContext(CartContext);


    function addQuantity(id) {
        addProduct(id)
    }

    function removeQuantity(id) {
        removeProduct(id)
    }

    

    return (
        <tr>
        <td className="py-4">
            <div className="flex items-center">
                <img className="h-16 w-16 mr-4" src={cartProduct.images[0]} alt="Product image"/>
                <span className="font-semibold">{cartProduct.productName}</span>
            </div>
        </td>
        <td className="py-4">
            <div clclassNameass="flex items-center">
                <button className="border rounded-md py-1 px-3 mr-2" onClick={() => removeQuantity(cartProduct._id)}>-</button>
                <span className="text-center w-8">{cartProducts.filter(id => id === cartProduct._id).length}</span>
                <button className="border rounded-md py-1 px-3 ml-2" onClick={() => addQuantity(cartProduct._id)}>+</button>
            </div>
        </td>
        <td className="py-4">${(cartProducts.filter(id => id === cartProduct._id).length * cartProduct.price).toFixed(2)}</td>
        
    </tr>
    )
}