const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 40
    },
    image: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 40
    },
    price: {
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 10
    },
    categoryId: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40
    }
});

let ProductModel = mongoose.model("Product", productSchema);

module.exports = {
    ProductModel
}