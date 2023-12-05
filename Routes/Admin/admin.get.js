const express = require('express');
const router = express.Router();

require('dotenv').config();

const { Admin } = require('../../Models/admin');

// router.get("/login", (req, res) => {
//     Admin.findOne()
// })

module.exports = router;
