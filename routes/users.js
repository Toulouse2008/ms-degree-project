const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

//add users from models folder
const User = require('../models/user');


//register, the /register will automatically added to /users
//register, the /register will automatically added to /users
router.post('/register', (req, res, next) => {
    //res.send("register site");
    // create new user
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });
    //add new user
    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'failed to register user'});
        }else {
            res.json({success: true, msg:'user registered'});
        }
    });
});

//authentication
router.post('/authenticate', (req, res, next) => {
    //res.send("authentication site");
    const username = req.body.username;
    const password = req.body.password;
/*
module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}*/
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        //check user
        if(!user){
            return res.json({success: false, msg: 'user not found'});
        }
/*
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
*/
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;

            if(isMatch){
                const token=jwt.sign({data: user}, 'secret', {
                    expiresIn: 6048000 //the token will expire in 6400
                });
                //if the password matches, return this
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
                //otherwise return false
            }else {
                return res.json({success: false, msg: 'wrong password'});
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    //res.send("profile site");
    res.json({user: req.user});
    //res.send(req.user);
});

module.exports = router;
