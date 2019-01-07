const cartItem = require('./../00_models/cartItem');
const cart = require('./../00_models/cart');
const product = require('./../00_models/product');
const user = require('./../00_models/user');
const userMiddleware = require("./middlewares/user");


let init = (app) => {
    
    // Get all cartItems of Specific user that have open cart to display:
            
    app.get("/api/cartItems/user/:q",userMiddleware.middleware, (req, res) => {
        
        cart.CartModel.findOne({
            "userId": req.params.q, "isOpen":true
        })
        .then( (mycart) => {

               if (mycart) {
                   
                    return mycart;
               }else{
                    return false;
               }
        }).then( (mycart) => {

            cartItem.CartItemModel.find({
                "cartId": mycart._id
            })
            .then( (items) =>  {            
                               
                if (items) {
                    return items;
                }else{
                    return false;
                }

            }).then( (items) => {
                
                product.ProductModel.find({ })
                .then( (products)  => { 
                    
                let CartItemsArray = [];
                for (let i = 0 ; i < items.length; i++) {
            
                    for (let k = 0 ; k < products.length; k++) {
                                                   
                        if ( items[i].productId == products[k]._id) {
                            
                            let cartItemObject = {};
                            cartItemObject['_id'] = items[i]._id;
                            cartItemObject['name'] = products[k].name;
                            cartItemObject['price'] = products[k].price;
                            cartItemObject['image'] = products[k].image;
                            cartItemObject['productId'] = items[i].productId;
                            cartItemObject['quantity'] = items[i].quantity;
                            cartItemObject['totalPrice'] = items[i].totalPrice;
                            cartItemObject['cartId'] = items[i].cartId;
                            CartItemsArray.push(cartItemObject);
                            break;
                        }
             
                    }
                }
                res.status(200).send(CartItemsArray);

                })

            })
        })   
            
    });
        

    // Delete cartItems function: (all)

    app.delete("/api/cartItems/user",userMiddleware.middleware,(req, res) =>{

        cartItem.CartItemModel.remove({"cartId":req.query.cartId})
        .then( () => {

            cart.CartModel.remove({ "_id":req.query.cartId})
            .then( () => {
                res.status(200).send(JSON.stringify({"cartId":req.query.cartId}));
            })
            .catch(err => res.status(400).send('Notice: there is no cart to delete!'));    
        })    
        .catch(err => res.status(400).send('Notice: there is no items in your cart!')); 
    });


    // Delete cartItem function: (single)

    app.delete("/api/cartItem/user",userMiddleware.middleware, (req, res) => {                                                        
             
        cartItem.CartItemModel.remove({ "_id":req.query.itemId, "cartId":req.query.cartId})
        .then( () => {
            
            cartItem.CartItemModel.count({ "cartId":req.query.cartId })
            .then( (count)  => {

                if (count ==  0) {

                   cart.CartModel.remove({ "_id":req.query.cartId })
                   .then( () => {
                        
                      res.status(200).send(JSON.stringify({"itemId":req.query.itemId}));
                   })
                   .catch(err => res.status(400).send(err));
                } else{                            
                    res.status(200).send(JSON.stringify({"itemId":req.query.itemId}));
                }                                    
            })              
        })
        .catch(err => res.status(400).send('Notice: there is no item with this itemId in your cart!'));   
    });
              

    // Update cartItem: 

    app.put("/api/cartItems/user",userMiddleware.middleware, (req, res) => {

        cart.CartModel.findOne({
            "userId": req.query.userId
        })
        .then( (mycarts) => {

               if (mycarts) {                  
                    return mycarts;
               }else{
                    res.status(401).send('Notice: your userId is invalid !');
                    return false;
               }
        }).then( (mycarts)  => {

                cartItem.CartItemModel.findOne({ "cartId": req.body.cartId, "productId": req.body.productId })
                .then( (item) => { 
                    
                    let currentCartItemPlusProductInfo = {};
                    
                    if (item) { 

                        if (req.body.quantity >= 1) { // check for quantity that is less then 1
                        
                            product.ProductModel.findOne({"_id": req.body.productId })
                            .then( async (myproduct) => {

                            let validTotalPrice = req.body.quantity * myproduct.price; // total price of all the same products                        
                            
                            currentCartItemPlusProductInfo['_id'] = item._id;
                            currentCartItemPlusProductInfo['productId'] = req.body.productId;
                            currentCartItemPlusProductInfo['quantity'] = req.body.quantity;
                            currentCartItemPlusProductInfo['cartId'] = item.cartId;
                            currentCartItemPlusProductInfo['totalPrice'] = validTotalPrice;
                            currentCartItemPlusProductInfo['name'] = myproduct.name;
                            currentCartItemPlusProductInfo['price'] = myproduct.price;
                            currentCartItemPlusProductInfo['image'] = myproduct.image;

                            item.quantity = req.body.quantity;
                            item.totalPrice = validTotalPrice;
                                                       
                            let updatedCartItem = await item.save()
                            return updatedCartItem;                                          
                            })
                            .then( (updatedCartItem) => {                                                 
                                res.status(200).send(currentCartItemPlusProductInfo);
                            });
                        
                        } else{
                            res.status(401).send('Notice: the quantity you send is less then 1!');
                        }                       

                    } else{
                        res.status(401).send('Notice: there is no such item in your cart !');
                    }
                })

            })       
    });
  


   // Create cartItem:

    app.post("/api/cartItems/:q",userMiddleware.middleware, (req, res) => {        
        cart.CartModel.findOne({"userId":req.params.q, "isOpen":true})
        .then(  async (mycart)=>{
            if(mycart){ // user have active cart
                return mycart;
            }else{ 
                // create user cart inside cart collection or if the user has active cart find the cart ID.
                
                let newCart = new cart.CartModel({ "userId": req.params.q, 'isOpen': true});
                let myNewCart  = await newCart.save();
              
                return myNewCart;
             }
        })
        .then( (mycart)=>{
            // check inside the cart items collection if we already have item with the productID and the cartID.
            // If we found one, we should request from the client to send PUT request to update the cart item.
                      
            cartItem.CartItemModel.findOne({ "cartId":mycart._id, "productId": req.body.productId })
            .then( (item) => {
                           
                if (item){
                    res.status(401).send('Notice: there is already same product in the cart, u need to update it !');
                    return false;
                } else{
                    return true;
                }
            })
            .then( (item) => {
                
            if (item && req.body.quantity >= 1) { // check for quantity that is less then 1

                product.ProductModel.findOne({"_id": req.body.productId })
                .then( async (myproduct) => {

                    // calculate the price of the item (find the product price by checking the products colleciton and multipile by the amount).
                    // create the new cart item with the detailes you have here.
                    // Search the actual product inside the products collection and return the filtered object with the product image.
                    // Item inside newCartItem should include the following properties after filter:
                    // product name, product picture and price for single product.
                    
                    let validTotalPrice = req.body.quantity * myproduct.price; // total price of all the same products 
                    req.body.totalPrice = validTotalPrice; // dont depand on what the customer send as a price !
                    req.body.cartId =  mycart._id; // important to give cartId in order to save in DB
                    let newCartItemPlusProductInfo = {};
                    newCartItemPlusProductInfo['productId'] = (req.body.productId);
                    newCartItemPlusProductInfo['quantity'] = (req.body.quantity);
                    newCartItemPlusProductInfo['totalPrice'] = validTotalPrice;                   
                    newCartItemPlusProductInfo['cartId'] =  mycart._id;                   
                    newCartItemPlusProductInfo['name'] = (myproduct.name);
                    newCartItemPlusProductInfo['price'] = (myproduct.price);
                    newCartItemPlusProductInfo['image'] = (myproduct.image);
                    let newCartItem = new cartItem.CartItemModel(req.body);
                    
                    await newCartItem.save()
                    .then( (newCartItem) => {                      
                        newCartItemPlusProductInfo['_id'] = newCartItem._id;                       
                        res.status(201).send(newCartItemPlusProductInfo);
                    })
                    .catch((e) => res.status(400).send(e.message));
                })

            } else {
                res.status(401).send('Notice: the quantity you send is less then 1!');
            }
      

            })
         
        })                     
    });


    //********** TOOL KIT FUNCTIONS FOR ADMINSTRATION ONLY - DIRECT APPROACH WITHOUT MIDDLEWARES AND COMPLEX FUNCTIONALTY***********//


    // Delete cartItem:  
    
    // app.delete("/api/cartItems/test", (req, res) => {
    //     cartItem.CartItemModel.remove({_id: req.query.id})
    //     .then(() => res.status(204).send())
    //     .catch(err => res.status(400).send(err));
    // });
  

    // Get all cartItems of all users 
            
    // app.get("/api/cartItems", (req, res) => {
    //     cartItem.CartItemModel.find({})
    //     .then( (cartItems) => {
               
    //         product.ProductModel.find({ })
    //         .then( (products)  => { 
               
    //         let newCartItemsArray = [];
    //         for (let i = 0 ; i < cartItems.length; i++) {
        
    //             for (let k = 0 ; k < products.length; k++) {
                                               
    //                 if ( cartItems[i].productId == products[k]._id) {
                        
    //                     let cartItemObject = {};
    //                     cartItemObject['_id'] = cartItems[i]._id;
    //                     cartItemObject['name'] = products[k].name;
    //                     cartItemObject['price'] = products[k].price;
    //                     cartItemObject['image'] = products[k].image;
    //                     cartItemObject['productId'] = cartItems[i].productId;
    //                     cartItemObject['quantity'] = cartItems[i].quantity;
    //                     cartItemObject['totalPrice'] = cartItems[i].totalPrice;
    //                     cartItemObject['cartId'] = cartItems[i].cartId;
    //                     newCartItemsArray.push(cartItemObject);
    //                     break;
    //                 }
         
    //             }
    //         }
    //         res.status(200).send(newCartItemsArray);
    //         })
           
    //     })
    //     .catch(err => res.status(400).send(err));
    // });



    //********** END TOOL KIT FUNCTIONS FOR ADMINSTRATION ONLY - DIRECT APPROACH WITHOUT MIDDLEWARES AND COMPLEX FUNCTIONALTY***********//



}

module.exports = { init }


