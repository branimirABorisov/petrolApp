const Product = require('../models/Product');


async function getCartProducts (productsIds) {
    return await Product.find({_id: productsIds});
}



module.exports = {
    getCartProducts
}