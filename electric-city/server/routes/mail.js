const express = require('express')
const router = express.Router()
const db = require("../utils/db.server.ts")
const nodemailer = require('nodemailer')
require('dotenv').config();
const mailHtml = require("../utils/mailOrderConfirmation")

router.post("/order", async (req, res) => {
    try {
        const email = req.body.client.email;
        const id = req.body.id;
        console.log(email, id);
        mailer(email, id);
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

function mailer(clientEmail, orderId) {
    const mail = process.env.EMAIL;
    const mailPassword = process.env.MDP;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: mail,
            pass: mailPassword
        }
    });
    let mailOptions = {
        from: mail,
        to: clientEmail,
        subject: "Electric-city commande: " + orderId,
        html: mailHtml
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = router
