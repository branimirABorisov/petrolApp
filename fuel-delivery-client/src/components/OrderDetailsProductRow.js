export default function OrderDetailsProductRow({product}) {
    return (
        <div className="flex flex-row justify-between items-center mt-3 p-4 border-2 border-meta-2 rounded-lg">
            <div className="flex items-center gap-5">
                <img className="w-15" src={product.product_data.image} alt="product-image" />
                <div className="flex flex-col text-xl">
                    <p>{product.product_data.name}</p>
                    <p>Quantity: {product.quantity}</p>
                </div>

            </div>
            <div className="text-xl">
                Total: ${product.product_data.value}
            </div>
        </div>
    )
}