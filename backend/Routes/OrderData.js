const express = require('express');
const router = express.Router();
const Orders = require('../models/OrderData');

// Route to handle order data
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ success: false, message: "Invalid order data" });
    }

    console.log("Order Data:", data);
    
    // Add the order date at the beginning of the array
    data.splice(0, 0, { Order_date: req.body.order_date });

    try {
        // Find if a record with the email exists
        let eId = await Orders.findOne({ 'email': req.body.email });
        console.log(eId);

        if (eId === null) {
            // Create a new order record if no record exists for the email
            await Orders.create({ email: req.body.email, order_data: [data] });
            res.json({ success: true });
        } else {
            // Update the existing record with the new order data
            await Orders.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error: " + err.message);
    }
});

// Route to fetch my order data
router.post('/myOrderData', async (req, res) => {
    try {
        console.log("The requested email = ", req.body.email);
        let eId = await Orders.findOne({ 'email': req.body.email });
        console.log("The eId=", eId);
        
        if (eId) {
            res.json({ orderData: eId });
        } else {
            res.status(404).json({ success: false, message: "No order data found" });
        }
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
});

module.exports = router;
