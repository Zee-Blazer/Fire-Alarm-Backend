const express = require('express');
const router = express.Router();

require('dotenv').config();

const { Client } = require('../../Models/clients');

router.get("/all-clients", (req, res) => {
    Client.find()
    .then( doc => res.status(200).send(doc) )
    .catch( err => res.status(200).send(err) );
})

router.get("/specific/:id", (req, res) => {
    Client.findOne({ email: req.params.id })
    .then( doc => res.status(200).send(doc) )
    .catch( err => res.status(400).send(err) );
})

router.get('/fire-building', (req, res) => {
    Client.find({ status: true })
    .then( doc => res.status(200).send(doc) )
    .catch( err => res.status(400).send(err) );
})

module.exports = router;
