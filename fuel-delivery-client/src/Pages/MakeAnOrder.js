import axios from "axios"
import { useEffect, useState, useContext } from "react"
import ClientProductCard from "../components/ClientProductCard";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";





export default function MakeAnOrder() {

    const { cartTotalPrice, cartProducts } = useContext(CartContext);


    const [products, setProducts] = useState([]);

    useEffect(() => {

        axios.get('products').then(res => {
            setProducts(res.data);
        })

    }, [])
    return (
        <div className="bg-whiten -mt-14 min-h-screen">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex align-middle items-center justify-between text-2xl">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Make your order here.</h2>
                    <div className="flex flex-row justify-center items-center gap-2 bg-white p-3 rounded-lg shadow-default">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-8 w-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        <Link to='/cart' className="left-4 rounded-full bg-danger p-0.5 px-2 text-sm text-white"><span >Quantity: {cartProducts.length}</span></Link>
                    </div>

                </div>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <ClientProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}