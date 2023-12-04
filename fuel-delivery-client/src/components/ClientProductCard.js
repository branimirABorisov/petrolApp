import { useContext } from "react"
import { CartContext } from "../contexts/CartContext"

export default function ClientProductCard({ product }) {

    const { addProduct,  } = useContext(CartContext);


    function addToCart() {
        addProduct(product._id);
    }

    return (

        <div key={product.id} className="group relative bg-white p-3 rounded-xl shadow-default">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                    src={product.images[0]}
                    alt="product-images"
                    className="h-full w-full object-contain object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                            {product.productName}
                        </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <button className="bg-black text-white px-2 rounded-lg" type="button" onClick={addToCart}>${product.price} per {product.unit}</button>
            </div>
        </div>
    )
}