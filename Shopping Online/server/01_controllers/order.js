const order = require('./../00_models/order');
const cartItem = require('./../00_models/cartItem');
const cart = require('./../00_models/cart');
const product = require('./../00_models/product');
const userMiddleware = require("./middlewares/user");

let init = (app) => {
        
   
	// Count all orders

	app.get("/api/orders/count", (req, res) =>	{

		order.OrderModel.count({ })
		.then( (count) => {
			res.status(200).send(JSON.stringify({counter:count}));
		})
		.catch((e) => res.status(400).send(e) );

	});

	
    // Get all orders of spesific user

    app.get("/api/orders/:q",userMiddleware.middleware, (req, res) =>  {

        order.OrderModel.find({ "userId": req.params.q })
        .then( (myorders) => {
            res.status(200).send(JSON.stringify({orders:myorders}));
        })
        .catch((e) => res.status(400).send(e) );

    });



    // Create new order by user Id

    app.post("/api/orders/:q",userMiddleware.middleware, (req, res) => {        

    	cart.CartModel.findOne({ "userId":req.params.q, "isOpen":true })
    	.then( (mycart) => {
    		if(mycart){ // user have active cart
                return mycart;
            }else{      
            	res.status(401).send('Notice: there is no cart open for this user Id!');                         
                return false;
            }
    	})
    	.then( (mycart) => {

            const regularEmailPattern = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;                           
            const result = regularEmailPattern.test(req.body.shippingDate);  // is shipping date correct pattern YYYY-MM-DD

            if (result) {

                order.OrderModel.count({ "shippingDate": req.body.shippingDate }) 
                .then( (count) => {
                    
                    if (count <= 2) { // count if there 2 or less create order, else show error message
                        
                        cartItem.CartItemModel.find({ "cartId":mycart._id })
                        .then( (items) => {  

                        if (items) {                    
                        let totalItemsPrice = 0;
                        for (let i = 0; i < items.length; i++) {                                             
                           totalItemsPrice += items[i].totalPrice;                                         
                        }
                                            
                        let newOrder = new order.OrderModel({...req.body, userId:req.params.q , cartId:mycart._id,"totalPrice": totalItemsPrice}); 
                        newOrder.save()
                        .then( () => {
                            
                            mycart.isOpen = false;
                            mycart.save()
                            .then(  () => {
                                res.status(201).send(newOrder);
                            })
                            .catch((e) => res.status(400).send(e));
                        })
                        
                        } else {
                            res.status(401).send('Notice: there is no items in this cart!');  
                        }

                        })

                    } else{
                        res.status(401).send({'error':'Notice: there is 3 orders already in this shipping date!'});                          
                    }

                })
                
            } else{
                res.status(401).send('Notice: the shipping date pattern is invalid!');  
            }

    		         
    	})               
    });
   

    //********** TOOL KIT FUNCTIONS FOR ADMINSTRATION ONLY - DIRECT APPROACH WITHOUT MIDDLEWARES AND COMPLEX FUNCTIONALTY***********//


    // Delete order

    // app.delete("/api/orders", (req, res) => {
    //     order.OrderModel.remove({_id: req.query.id})
    //     .then(() => res.status(200).send())
    //     .catch(err => res.status(400).send(err));
    // });


    //Get all orders:
    
    // app.get("/api/orders", (req, res) => {
    //     order.OrderModel.find({})
    //     .then(orders => res.status(200).send(orders))
    //     .catch(err => res.status(400).send(err));
    // });

    // Count all orders with the same  date

    // app.get("/api/orders/count/date/:q", (req, res) =>  {

    //     order.OrderModel.count({ "shippingDate": req.params.q })
    //     .then( (count) => {
    //         res.status(200).send(JSON.stringify({counter:count}));
    //     })
    //     .catch((e) => res.status(400).send(e) );

    // });

    // Create order - regular
    
    // app.post("/api/orders", (req, res) => {
    //     let newOrder = new order.OrderModel(req.body);
    //     newOrder.save()
    //     .then(() => res.status(201).send(newOrder))
    //     .catch((e) => res.status(400).send(e));
       
    // });

    //********** END TOOL KIT FUNCTIONS FOR ADMINSTRATION ONLY - DIRECT APPROACH WITHOUT MIDDLEWARES AND COMPLEX FUNCTIONALTY***********//

    
}

module.exports = { init }