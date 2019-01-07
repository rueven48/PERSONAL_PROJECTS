const category = require('./../00_models/category');

let init = (app) => {

   
    
    //Get all categories:
    
    app.get("/api/categories", (req, res) => {
        category.CategoryModel.find({})
        .then(categories => res.status(200).send(categories))
        .catch(err => res.status(400).send(err));
    });




    //********** TOOL KIT FUNCTIONS FOR ADMINSTRATION ONLY - DIRECT APPROACH WITHOUT MIDDLEWARES AND COMPLEX FUNCTIONALTY***********//

    // Delete category: 
    
    // app.delete("/api/categories", (req, res) => {
    //     category.CategoryModel.remove({_id: req.query.id})
    //     .then(() => res.status(204).send())
    //     .catch(err => res.status(400).send(err));
    // });

   // Create init category - init 1 time only !

   /* curl */

    // curl -v -X POST -H "Content-type: application/json" -d  "{\"name\": \"Milk And Eggs\"}" localhost:6000/api/categories
    // curl -v -X POST -H "Content-type: application/json" -d  "{\"name\": \"Vegtables And Fruits\"}" localhost:6000/api/categories
    // curl -v -X POST -H "Content-type: application/json" -d  "{\"name\": \"Meat And Fish\"}" localhost:6000/api/categories
    // curl -v -X POST -H "Content-type: application/json" -d  "{\"name\": \"Wine And Drinks\"}" localhost:6000/api/categories

    // app.post("/api/categories", (req, res) => {
    //     let newCategory = new category.CategoryModel(req.body);
    //     newCategory.save()
    //     .then(() => res.status(200).send(newCategory))
    //     .catch((e) => res.status(400).send(e));
       
    // })

    //********** END TOOL KIT FUNCTIONS FOR ADMINSTRATION ONLY - DIRECT APPROACH WITHOUT MIDDLEWARES AND COMPLEX FUNCTIONALTY***********//
}

module.exports = { init }


