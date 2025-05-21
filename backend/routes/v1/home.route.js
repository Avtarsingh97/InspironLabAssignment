const express = require('express');
const router = express.Router();

// Default route to check if the Notes API is working
router.get('/',(req,res)=>{
    res.status(200).json({
        message:"Welcome to the Notes API!"
    })
});

module.exports = router;