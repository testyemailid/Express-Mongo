const express = require('express')
const router = express();
const variyfy = require('./verifytoken');

router.get("/",variyfy,(req,res) => {
    res.send("hey i'am dashboard  !");
});

module.exports = router;