const { model, Schema } = require('mongoose');



const userSchema = new Schema({
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    vat: { type: String, required: true },
    phone: { type: String, required: true},
    address: { type: String, required: true},
    email: { type: String, required: true},
    hashedPassword: { type: String, required: true },
    userRole: { type: String, enum: ['Admin', 'Client', 'Employee', 'User'], default: 'User' }
})



userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 1
    }
})

const User = model('User', userSchema);


module.exports = User;