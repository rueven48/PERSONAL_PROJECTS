const mongoose = require("mongoose");


let cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false,
        unique: false,
        minlength: 2,
        maxlength: 40
    },
    date: {
        type: Date,
        default: Date.now
    },
    isOpen: {
        type: Boolean,
        required: true,
        unique: false,
        minlength: 4,
        maxlength: 5
    }
});

let CartModel = mongoose.model("cart", cartSchema);

module.exports = {
    CartModel
}