const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

//const {getUser, signup, login} = require('../contorllers/user');

router.get('/',async(req,res,next)=>{
    let users;
    try{
        users = await User.find();
    }
    catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404);
    }
    return res.status(200).send('user found');
});
router.post('/signup', async(req,res,next)=>{
    const{name, emailId, password, mobile, bio}= req.body;
     let exUser;
     try{
        exUser= await User.findOne({emailId});
     }
     catch(err){
        return console.log(err);
     }
     if(exUser){
        return res.status(400).send('error occured');
     }
     const hashPassword = bcrypt.hashSync(password);
     const user = new User({
        name,
        password: hashPassword,
        emailId,
        mobile,
        bio,
        blogs: [],
     });

     try {
        await user.save();
     } catch (err) {
        return console.log(err);
     }
     return res.status(201);
});
router.post('/login', async(req,res,next)=>{
    const {emailId, password} = req.body;
    let exUser;
     try{
        exUser= await User.findOne({emailId});
     }
     catch(err){
        return console.log(err);
     }
     if(!exUser){
        return res.status(404).send('error occured');
     }
     const isPwCrt = bcrypt.compareSync(password, exUser.password);
     if(!isPwCrt){
        return res.status(400).json({message: 'incorrect password'});
     }
     return res.status(200);
});
module.exports=router;