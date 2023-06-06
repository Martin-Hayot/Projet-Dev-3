const express = require('express')
const router = express.Router()
const db = require("../utils/db.server.ts")
const nodemailer = require('nodemailer')
require('dotenv').config();
const mailHtml = require("../utils/mailOrderConfirmation")

router.post("/order", orderValidator, async (req, res) => {
    const email = req.body.client.email;
    const orderId = req.body.id;
    try {
        console.log(email, orderId);
        //mailer(email, orderId);
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

async function orderValidator(req, res, next) {
    if (!req.body || !req.body.client || !req.body.client.email || !req.body.id) {
        return res.sendStatus(400);
    }
    try {
        await db.user.findUniqueOrThrow({
            where: {
                email: req.body.client.email
            }
        });
    } catch (err) {
        return res.sendStatus(400)
    }
    try {
        await db.order.findUniqueOrThrow({
            where: {
                id: req.body.id
            }
        });
    } catch (err) {
        return res.sendStatus(400)
    }
    next();
}

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
