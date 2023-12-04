const { model, Schema } = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const orderSchema = new Schema({
    orderNumber: { type: String, unique: true },
    items: Object,
    name: { type: String },
    companyName: { type: String },
    vat: { type: String },
    phone: { type: String },
    address: { type: String },
    email: { type: String },
    orderStatus: {
        type: String,
        enum: ["new", "in progress", "canceled", "complete"],
        default: "new"
    },
    assignTo: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

orderSchema.pre('save', function (next) {
    const numericOnly = uuidv4().replace(/[^\d]/g, '');
    this.orderNumber = numericOnly;
    next();
});

const Order = model('Order', orderSchema);

module.exports = Order;
