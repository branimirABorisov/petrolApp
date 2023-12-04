import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CartItemsRows from "../components/CartItemsRows";
import { useNavigate } from "react-router-dom";



export default function Cart() {
    const navigate = useNavigate();
    const { cartProducts, clearCookies } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    useEffect(() => {

        if (cartProducts.length > 0) {
            axios.post('cart', { ids: cartProducts }).then(res => {
                setProducts(res.data);
            })
        }

    }, [cartProducts])

    const orderData = {
        name: user?.name,
        companyName: user?.companyName,
        vat: user?.vat,
        phone: user?.phone,
        address: user?.address,
        email: user?.email,
        products: cartProducts.join(', ')
    }

    async function sendOrder() {
        try {
            await axios.post('orders', orderData);
            clearCookies();
            navigate('/complete');
        } catch (error) {
            console.error('Error sending order:', error);
        }
    }

    let totalPrice = 0;

    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        totalPrice += price;
    }


    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-default p-6 mb-4">

                            {products.length > 0 ? (
                                <table className="w-full ">
                                    <thead>
                                        <tr>
                                            <th className="text-left font-semibold">Product</th>
                                            <th className="text-left font-semibold">Quantity/Liter</th>
                                            <th className="text-left font-semibold">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {products.map(product => (
                                            <CartItemsRows cartProduct={product} />
                                        ))}


                                    </tbody>
                                </table>
                            ) : (
                                <div className="flex justify-center  bg-success text-white items-center font-bold py-2 rounded-lg  shadow-default gap-2 text-2xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                    </svg>
                                    Cart is empty!
                                </div>
                            )}


                        </div>
                    </div>
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-lg shadow-default p-6">
                            <h2 className="text-lg font-semibold mb-4">Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Taxes</span>
                                <span>$1.99</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Shipping</span>
                                <span>$0.00</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Total</span>
                                <span className="font-semibold">${(totalPrice + 1.99).toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-default p-6 mt-2">
                            <h2 className="text-lg font-semibold mb-4">Delivery details:</h2>
                            <div className="flex justify-between mb-2">
                                <span>Name: {user?.name}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Company name: {user?.companyName}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>VAT: {user?.vat}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Phone: {user?.phone}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Address: {user?.address}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Email: {user?.email}</span>
                            </div>
                            <hr className="my-2" />

                            <button className="bg-black text-white py-2 px-4 rounded-lg mt-4 w-full" onClick={sendOrder}>Send Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}