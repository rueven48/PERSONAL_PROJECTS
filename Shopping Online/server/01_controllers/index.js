// Requires (from node_modules):
const express = require("express"); 
const bodyParser = require("body-parser"); 
const path=require('path');


// Requires (to activate this file that opens the connection to the DB):
const index = require('./../00_models/index');

// Requires (from current folder - to add controllers to our express app):
const user = require('./user');
const product = require('./product');
const category = require('./category');
const cart = require('./cart');
const cartItem = require('./cartItem');
const order =require('./order');

// Create express app:
const app = express();

// Use middlewares (app level):
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname+"/../02_views"))); 


user.init(app);
product.init(app);
category.init(app);
cart.init(app);
cartItem.init(app);
order.init(app);

app.listen(process.env.PORT || 6000, ()=>{console.log("ok")})
module.exports={app};