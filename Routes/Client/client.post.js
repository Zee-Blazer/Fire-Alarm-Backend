const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const twilio = require('twilio');

require("dotenv").config();

const { Client } = require('../../Models/clients');

router.post("/new", (req, res) => {
    const client = new Client(req.body);

    client.save()
    .then( doc => res.status(200).json({ msg: "Account created successfully", doc }) )
    .catch( err => res.status(400).json({ msg: "Account not created", err }) );
});

router.post('/fill-info', (req, res) => {
    // res.status(200).send(req.body)
    Client.findOneAndUpdate({ email: req.body.email }, req.body.details)
    .then( doc => res.status(200).json({ msg: "Completed!!!", doc }) )
    .catch( err => res.status(400).json({ msg: "Uncompleted!!!", err }) );
});

router.post('/login', (req, res) => {
    Client.findOne({ email: req.body.email, password: req.body.password })
    .then( doc => {
        if(doc) return res.status(200).send(doc);
        return res.status(400).json({ msg: "Wrong password or email. Please try again" })
    } )
    .catch( err => res.status(400).send(err) );
});

router.post('/send-email', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "ganiyu.bolaji@binghamuni.edu.ng",
            pass: "Bingham@123"
        }
    });

    const mailOptions = {
        from: "ganiyu.bolaji@binghamuni.edu.ng",
        to: "ganiyu.bolaji.bo@gmail.com",
        subject: req.body.header, //"Fire Alarm",
        text: req.body.text, //"There is a fire alerm at you Building"
    };

    transporter.sendMail(mailOptions, (err, doc) => {
        if(err) return res.status(400).send("There was an error");
        res.status(200).send("Email sent successfully");
    })
})

router.post('/send-sms', (req, res) => {
    const client = twilio("AC2cb9437aa0e5f73a320dfc1a9fb93018", "03dd73e1354f912e664be0d1cee9bda7");

    client.messages.create({
        body: req.body.msg, //"FIRE ALARM!!\nThere is a fire Alarm at your building"
        from: "+13392442573",
        // from: "+14432724025",
        to: "+2348139077093"
    })
    .then( message => res.status(200).send(message) )
    .catch( err => res.status(400).send(err) );
})

module.exports = router;
