const express = require("express");
const router = express.Router();

require('dotenv').config();

const { Admin } = require("../../Models/admin");

router.post('/new', (req, res) => {
    const admin = new Admin(req.body);

    admin.save()
    .then( doc => res.status(200).send(doc) )
    .catch( err => res.status(400).send(err) );
})

router.post("/login", (req, res) => {
    Admin.findOne({ admin: req.body.admin, password: req.body.password })
    .then( doc => {
        if(doc) return res.status(200).send(doc);
        return res.status(400).json({ msg: "Wrong password or email. Please try again" })
    } )
    .catch( err => res.status(400).send(err) );
})

module.exports = router;
