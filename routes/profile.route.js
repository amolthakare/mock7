const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");
require('dotenv').config();

const ProfileRoutes = express.Router();

// ProfileRoutes.get("/",(req,res)=>{
//     res.send("hello masai");
// })

ProfileRoutes.get("/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const profile = await UserModel.find({"_id":id});
        // const profile = await UserModel.find()
        console.log(profile);
        res.send(profile);
    }
    catch(err){
        res.send(err);
    }
})

ProfileRoutes.patch("/:id",async(req,res)=>{
    const payload = req.body;
    const id = req.params.id;
    const profile = await UserModel.findOne({"_id":id});
    console.log(profile);
    try{
        await UserModel.findByIdAndUpdate({"_id":id},payload);
        res.send({msg:"Updated the profile"});
    }
    catch(err){
        console.log(err);
        res.status(404);
        res.send({error:"Profile doesn't exsist"})
    }
})

module.exports=ProfileRoutes;
