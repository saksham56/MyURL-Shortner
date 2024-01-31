const express = require('express')
const {Account} =require('../db');
const {authMiddleware} =require( '../middleware');

const router = express.Router();

router.get("/url",authMiddleware,async (res,req)=>{
    const account = await Account.findOne({
        userId:req.userId
    });

    res.json({
        url: account.url
    })
})
router.put("/url-add",async(req,res)=>{
    const url = req.body;
    const account = await Account.findOne({
        userId:req.body.userId
    })
    await account.updateOne(
        { $push: { url :url} }
      );

     res.json({
        message:"url added"
     }) 
})
module.exports = router