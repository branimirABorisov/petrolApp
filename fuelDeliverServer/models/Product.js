const { model, Schema } = require('mongoose');

const productSchema = new Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    unit: { type: String },
    category: { type: String },
    description: { type: String, required: true }
}, { timestamps: true });


const Product = model('Product', productSchema)


module.exports = Product;