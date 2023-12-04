const Product = require('../models/Product');



async function createProduct ({productName, price, images, unit, category, description}) {
    const product = new Product({
        productName,
        price,
        images,
        unit,
        category,
        description
    })

    await product.save();
    return product;
}


async function getAllProducts () {
    return Product.find({});
}


async function getProductById (id) {
    return await Product.findById({_id: id});
}


async function updateProductById (id, product) {
    const productDetails = await Product.findByIdAndUpdate(
        id,
        {
            productName: product.productName,
            price: product.price,
            images: product.images,
            unit: product.unit,
            category: product.category,
            description: product.description,

        },
        {new: true}
    )

    return productDetails;
   
}


async function deleteProductById (id) {
    return await Product.findOneAndDelete({_id: id});
}



module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
}
