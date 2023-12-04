const Order = require('../models/Order');
const Product = require('../models/Product');



async function getAllOrders() {
    return await Order.find({});
}


async function getOrderById(orderId) {
    return await Order.findById({ _id: orderId });

}


async function updateOrderById(orderId, data) {
    const orderData = Order.findByIdAndUpdate(
        orderId,
        {
            orderStatus: data.orderStatus,
            assignTo: data.assignTo
        })

    return orderData;
}


async function deleteOrderById(orderId) {
    return await Order.findOneAndDelete({ _id: orderId });
}


async function createNewOrder({ name, companyName, vat, phone, address, email, products }) {

    const productsId = products.split(', ');
    const uniqueIds = [...new Set(productsId)]


    const productInfo = await Product.find({ _id: uniqueIds });


    let items = [];

    for (const productId of uniqueIds) {
        const info = productInfo.find(p => p._id.toString() === productId);
        const quantity = productsId.filter(id => id === productId)?.length || 0;
        if (quantity > 0 && info) {
            items.push({
                quantity,
                product_data: {
                    name: info.productName,
                    image: info.images[0],
                    value: quantity * info.price
                }
            })
        }
    }


    const newOrder = await Order.create({
        items,
        name,
        companyName,
        vat,
        phone,
        address,
        email
    })

    await newOrder.save();
    return newOrder;
}


module.exports = {
    createNewOrder,
    getAllOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById
}