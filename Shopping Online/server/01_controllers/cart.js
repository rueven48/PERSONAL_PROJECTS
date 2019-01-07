const cart = require('./../00_models/cart');
const userMiddleware = require("./middlewares/user");

let init = (app) => {

    

    // Get all carts with user Id
    
    app.get("/api/carts/user/:q", userMiddleware.middleware, (req, res) => {

        cart.CartModel.find({"userId":req.params.q})
        .then(carts => {
            res.status(200).send(JSON.stringify({"carts":carts}));
        })
        .catch((e) => { res.status(400).send(e) });     
    });

    

    //********** TOOL KIT FUNCTIONS FOR ADMINSTRATION ONLY - DIRECT APPROACH WITHOUT MIDDLEWARES AND COMPLEX FUNCTIONALTY***********//


    // Get user open carts by user Id

    // app.get("/api/carts/open/:q", userMiddleware.middleware, (req, res) => {

    //     cart.CartModel.find({"userId":req.params.q, "isOpen":true})
    //     .then(carts => {
    //         res.status(200).send(JSON.stringify({"carts":carts}));
    //     })
    //     .catch((e) => { res.status(400).send(e) });     
    // });


    // Get all carts:
    
    // app.get("/api/carts", (req, res) => {
       
    //     cart.CartModel.find({})
    //     .then(carts => res.status(200).send(carts))
    //     .catch(err => res.status(400).send(err));
    // });


    // Delete cart: 
    
    // app.delete("/api/carts", (req, res) => {
        
    //     cart.CartModel.remove({"_id": req.query.id})
    //     .then(() => res.status(204).send())
    //     .catch(err => res.status(400).send(err));
    // });

   // Create cart

    // app.post("/api/carts", (req, res) => {
        
    //     let newCart = new cart.CartModel(req.body);
    //     newCart.save()
    //     .then(() => res.status(200).send(newCart))
    //     .catch((e) => res.status(400).send(e));
       
    // })

    //********** END TOOL KIT FUNCTIONS FOR ADMINSTRATION ONLY - DIRECT APPROACH WITHOUT MIDDLEWARES AND COMPLEX FUNCTIONALTY***********//
}

module.exports = { init }


