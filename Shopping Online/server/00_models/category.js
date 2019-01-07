const mongoose = require("mongoose");

let categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 60
    }
});

let CategoryModel = mongoose.model("Category", categorySchema);

module.exports = {
    CategoryModel
}