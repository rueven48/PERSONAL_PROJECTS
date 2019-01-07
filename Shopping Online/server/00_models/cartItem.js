const mongoose = require("mongoose");

let cartItemSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: false,
        minlength: 2,
        maxlength: 40
    },
    quantity: {
        type: Number,
        required: true,
        unique: false,
        minlength: 1,
        maxlength: 5
    },
    totalPrice: {
        type: Number,
        required: true,
        unique: false,
        minlength: 1,
        maxlength: 12
    },
    cartId: {
        type: String,
        required: false,
        unique: false,
        minlength: 2,
        maxlength: 40
    }
});

let CartItemModel = mongoose.model("cartItem", cartItemSchema);

module.exports = {
    CartItemModel
}