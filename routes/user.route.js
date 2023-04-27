const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
require('dotenv').config();

const UserRoutes = express.Router();

UserRoutes.get("/",(req,res)=>{
    res.send("hello masai");
})
UserRoutes.post("/register",async(req,res)=>{
    const {profile,name,bio,phone,email,pass} = req.body;
    try{
        bcrypt.hash(pass, 5, async(err, secure_password)=> {
            if(err){
                console.log(err);
            }
            else{
                const user = new UserModel({profile,name,bio,phone,email,pass:secure_password});
                await user.save();
            }
        });
        res.send({msg:"registered"});
    }
    catch(err){
        res.send("error in registered");
        console.log(err);
    }
})

UserRoutes.post("/login",async(req,res)=>{
    const {email,pass} = req.body;
    try{
        const user = await UserModel.find({email});
        
        if(user.length>0){
            bcrypt.compare(pass, user[0].pass, function(err, result) {
                if(result){
                    const token = jwt.sign({ userID:user[0]._id }, process.env.key);
                    res.send({"msg":"logged in","token":token,"userID":user[0]._id,"name":user[0].name});
                }
                else{
                    res.send("wrong credentials")
                }
            });
            
        }
        else{
            res.send("err");
        } 
    }
    catch(err){
        res.send("error in login");
        console.log(err);
    }
})


module.exports=UserRoutes;
