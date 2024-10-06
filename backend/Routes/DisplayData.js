const express = require('express');
const Router = express.Router();
const User = require('../models/User');

Router.get("/foodItems",async(req,res)=>{
    try{
        const data = await User.find();
        // const foodItems = await food-items.find();
        // global.foodItems = foodItems;
        global.data = data;
        console.log(data);
        console.log("Data Fetched");
        res.status(200).json([global.foodItems,global.foodCategory]);
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
})

module.exports = Router;