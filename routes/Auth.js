const express = require('express')
const user = require('../models/auth_model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');  
const router = express();

router.post('/signup',async (req,res) => {
    // check : user is alrery exist or not
    const user_possible = await user.findOne({email:req.body.email});
    if(user_possible) return res.status(203).send({ message: 'user already exist' });
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hash_password =await bcrypt.hash(req.body.password, salt);
    // add new user
    const data = new user({
        name:req.body.name,
        email:req.body.email,
        password:hash_password,
    });
    // save the data to the database
    try{
        const result = await data.save()
        res.json({ message:result });
    }catch(err){
        res.status(203).json({ message:err });
    }
});

router.post('/login',async (req,res) => {
    // check : user is exist or not
    const user_data = await user.findOne({email:req.body.email});
    if(!user_data) return res.status(400).json({ message: 'emaill not registed ! ' });
    // credencial checking
    const valid_password = await bcrypt.compare(req.body.password,user_data.password);
    if(!valid_password) return res.status(400).json({ message: 'Invalid pasword' });
    // after succefully loggedd in
    //create and assign token
    const token  = jwt.sign({_id:user_data._id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);
    // return res.status(200).json({ message: 'done' });
});



module.exports = router;