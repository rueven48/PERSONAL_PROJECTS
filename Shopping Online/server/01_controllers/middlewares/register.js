const jwt = require('jsonwebtoken');
const user = require('./../../00_models/user');


let registerMiddleware = (req, res, nextStep) => {
        
        user.UserModel.findOne({
                "userId": req.body.userId 
            })
        .then( (member) => {
                    
            if (member == null){ // no user with same id
                 
                const regularEmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const result = regularEmailPattern.test((req.body.userName).toLowerCase());  // this check is addition to the angular check in case of direct curl without email valid pattern

                if (result) {
                    if (req.body.isAdmin == false) {                     
                        nextStep(); 
                    } else {
                        res.status(401).send('Notice: you are tring to resgister as admin but this not allowed!');
                    }
                } else{
                    res.status(401).send('Notice: email pattern is not valid!');
                }                   
                                                
            }else{
                res.status(401).send({'error':'Notice: user id already exsist!'});
            }               
        })
        .catch(err => response.status(400).send(err));
};

module.exports = { "middleware":registerMiddleware }