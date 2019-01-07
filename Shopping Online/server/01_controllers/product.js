const product = require('./../00_models/product');
const adminMiddlware = require("./middlewares/admin")

let init = (app) => {

        
 
    // Count all products in the shop:
    
    app.get("/api/products/count", (req, res) => {
        product.ProductModel.count({})
        .then( (count) => {
          res.status(200).send(JSON.stringify({counter:count})); 
        })      
        .catch(err => res.status(400).send(err));
    });
  

    // Create product 

    app.post("/api/products",adminMiddlware.middleware, (req, res) => {      
        let newProduct = new product.ProductModel(req.body);
        newProduct.save()
        .then(() => res.status(201).send(JSON.stringify({'success_message':'save successfully!'})))
        .catch((e) => res.status(400).send(e));    
    })


    // Get products by name - no need middleware
    
    app.get("/api/products/:q", (req, res) => {

        let regex= new RegExp(req.params.q || "a" ,"i");

        product.ProductModel.find({"name":regex})
        .then(products => {
            res.status(200).send(JSON.stringify({"items":products}));
        })
        .catch((e) => { res.status(400).send(e) });
       
    });

    //Update product 

    app.put("/api/products/:q", adminMiddlware.middleware, (req, res) =>{
        
        product.ProductModel.findOne({"_id": req.params.q})
        .then(myproduct => {
          
            if(myproduct){
              
              myproduct['name'] = req.body.name;
              myproduct['price'] = req.body.price;              
              myproduct['categoryId'] = req.body.categoryId;
              myproduct['image'] = req.body.image;              
              myproduct.save();
              res.status(200).send(JSON.stringify({'success_message':'save successfully!'}));
            } else {
                 res.status(401).send('Notice: product not found!');
            }          
        })
        .catch(err => res.status(400).send(err));
    
    });

    
    //Get all products:
    
    app.get("/api/products", (req, res) => {
        product.ProductModel.find({})
        .then(products => res.status(200).send(products))
        .catch(err => res.status(400).send(err));
    });


    //Get all products of spesific category :
    
    app.get("/api/products/category/:q", (req, res) => {  	
        product.ProductModel.find({ "categoryId" : req.params.q })
        .then(products => {          
            res.status(200).send(products)
        })
        .catch(err => res.status(400).send(err));
    });

 

    //********** TOOL KIT FUNCTIONS FOR ADMINSTRATION ONLY - DIRECT APPROACH WITHOUT MIDDLEWARES AND COMPLEX FUNCTIONALTY***********//


    // Delete product: 
    
    // app.delete("/api/products", (req, res) => {
    //     product.ProductModel.remove({_id: req.query.id})
    //     .then(() => res.status(204).send())
    //     .catch(err => res.status(400).send(err));
    // });

   // Create init products

    // app.post("/api/products/test", (req, res) => {
    //     let newProduct = new product.ProductModel(req.body);
    //     newProduct.save()
    //     .then(() => res.status(200).send(newProduct))
    //     .catch((e) => res.status(400).send(e));
       
    // })

    // Get product by id :

    // app.get("/api/products/id", (req, res) => {
    //     product.ProductModel.findOne({"_id": req.query.productId})
    //     .then(product => {
    //         res.status(200).send(product);
    //     })
    //     .catch((e) => { res.status(400).send(e) });
    // });

    //********** END TOOL KIT FUNCTIONS FOR ADMINSTRATION ONLY- DIRECT APPROACH WITHOUT MIDDLEWARES AND COMPLEX FUNCTIONALTY***********//
}

module.exports = { init }


