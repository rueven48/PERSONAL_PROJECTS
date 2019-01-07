const mongoose = require("mongoose");

let orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40
    },
    cartId: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40
    },
    totalPrice: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 10
    },
    city: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40
    },
    street: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40
    },
    shippingDate: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40
    },
    orderDate: {
        type: Date,
        default: Date.now        
    },
    creditCardDigits: {
        type: Number,
        required: true,
        minlength: 2,
        maxlength: 40
    }
});

let OrderModel = mongoose.model("Order", orderSchema);

module.exports = {
    OrderModel
}