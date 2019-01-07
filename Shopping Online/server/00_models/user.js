const mongoose = require("mongoose");


let userSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 20
        },
        userName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 30
        },
        userPassword: {
            type: String,
            required: true,
            unique: false,
            minlength: 5,
            maxlength: 80
        },
        isAdmin: {
            type: Boolean,
            required: true,
            minlength: 4,
            maxlength: 5
        },
        firstName: {
            type: String,
            required: false,
            minlength: 2,
            maxlength: 25
        },
        lastName: {
            type: String,
            required: false,
            minlength: 2,
            maxlength: 35
        },
        street: {
            type: String,
            required: false,
            minlength: 2,
            maxlength: 40
        },
        city: {
            type: String,
            required: false,
            minlength: 2,
            maxlength: 40
        },        
        token: {
            type: String,
            required: false,
            minlength: 2,
            maxlength: 70
        }
    }
);


let UserModel = mongoose.model("User", userSchema);

module.exports = {
    UserModel
}


