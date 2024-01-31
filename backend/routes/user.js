const express = require("express")

const {User,Account}=require("../db");
const zod = require('zod')
const jwt = require('jsonwebtoken')
const router = express.Router();
const JWT_SECRET= "SECRET";

const signupBody = zod.object({
    name:zod.string(),
    email:zod.string(),
    password:zod.string(),
});

router.post("/signup",async (req,res)=>{
    console.log("request came")
    //success will be a boolean
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"invalid entry"
        })
    }

    const existingUser = await User.findOne({
        email:req.body.email
    });
    if(existingUser){
        return res.status(411).json({
            message:"user already exists"
        })
    }

    const user = await User.create({
        email:req.body.email,
        name:req.body.name,
        password:req.body.password
    })
    const userId = user._id;

    await Account.create({
        userId,
        url:[]
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message:"User created successfully",
        token
    })
})










module.exports = router

    

