const jwt = require('jsonwebtoken');
const user = require('./../00_models/user');
const resgisterMiddleware = require("./middlewares/register");


let init = (app) => {
                         
    
    // Add client - REGISTER: 
    
    app.post("/api/users/register",resgisterMiddleware.middleware, (req, res) => {     
        
        let registerUser = new user.UserModel(req.body);
        res.status(200).send(registerUser);                   
    });

    // Add client - REGISTER STEP TWO:
    
    app.post("/api/users/registerStepTwo", (req, res) => {
        
        // check user _id if some user minpulation will have user Id but he will have to get Db _id also to check authentication 

        user.UserModel.find({ "_id" :req.body._id })
        .then( (myuser) => {
            if (myuser) {
                               
                let registerUser = new user.UserModel(req.body);
                registerUser.save()
                .then(newUser => {

                 //add to the response header a new property in the header
                 //the token contains the user`s id
                let data = {
                    tokenId: newUser._id
                };

                res.header('xx-auth', jwt.sign(data, 'my secret'));
                res.status(201).send(newUser);
                })
                .catch((e) => {
                res.status(400).send(e);
                });
                                            
            } else{
                res.status(401).send('Notice: you are tring to resgister but id doesnt match to Data base!');
            }
        })


        
    });

    // Get client - LOGIN:
    // every login request must have in the headers a property named 'xx-auth'
    // with a value that concats the `sha256 password` and the `userName`
    
    app.get("/api/login", (req, res) => {
        
        let headerVal = req.header('xx-auth');
        if (headerVal) {
            
                user.UserModel.findOne({
                    "userPassword": headerVal.substring(0, 64),
                    "userName": headerVal.substring(64, headerVal.length)
                }).then(currentUser => {                                        
                    
                    //add to the response header a new property in the header
                    //the token contains the user`s id
                    let data = {
                        tokenId: currentUser._id
                    };
                    res.header('xx-auth', jwt.sign(data, 'my secret'));
                    const currUser = {};
                    currUser['firstName'] = currentUser.firstName;
                    currUser['lastName'] = currentUser.lastName;
                    currUser['_id'] = currentUser._id;
                    currUser['isAdmin'] = currentUser.isAdmin;
                    currUser['city'] = currentUser.city;
                    currUser['street'] = currentUser.street;                                                                            
                    res.status(200).send(currUser);                                                
                            
                })
                .catch((e) => {
                    res.status(401).send({'error':'Notice: login denied, user name or password incorrect!'});
                });
        } else {
            res.status(401).send();
        }
    });
         

    //********** TOOL KIT FUNCTIONS FOR ADMINSTRATION ONLY - DIRECT APPROACH WITHOUT MIDDLEWARES AND COMPLEX FUNCTIONALTY***********//

    //Get all users:  
    
    // app.get("/api/users", (req, res) => {
    //     user.UserModel.find({})
    //     .then(users => res.status(200).send(users))
    //     .catch(err => res.status(400).send(err));
    // });

    // Delete user: 
    
    // app.delete("/api/users", (req, res) => {
    //     user.UserModel.remove({_id: req.query.id})
    //     .then(() => res.status(204).send())
    //     .catch(err => res.status(400).send(err));
    // });

    // Add admin: ----->  only 1 time to do.
       
    /* curl */
    
    // curl -v -X POST -H "Content-type: application/json" -d  "{\"userId\": 78789878,\"userName\": \"gadi@gmail.com\", \"userPassword\" : \"83b6a94e5ac0abfb56c8a8ee568e3e9f86052b0f96ae92b560f1155bb863130f\", \"city\": \"Tel Aviv\",\"street\": \"Rakefet 48\",\"firstName\": \"gadi\",\"lastName\": \"cohen\",\"isAdmin\": true }" localhost:6000/api/users/admin


    // app.post("/api/users/admin", (req, res)=> {
    //     let registerUser = new user.UserModel(req.body);
    //     registerUser.save()
    //     res.status(201); // Created.
    //     res.send();
    // });
    

    //********** END TOOL KIT FUNCTIONS FOR ADMINSTRATION ONLY - DIRECT APPROACH WITHOUT MIDDLEWARES AND COMPLEX FUNCTIONALTY***********//
    
}

module.exports = {
    init
}