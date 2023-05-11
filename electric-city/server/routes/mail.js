const express = require('express')
const router = express.Router()
const db = require("../utils/db.server.ts")
const nodemailer = require('nodemailer')
require('dotenv').config();
const mailHtml = require("../utils/mailOrderConfirmation")

router.post("/mail", async (req, res) => {
    try {
        const { userId, orderId } = req.body;

        const users = await db.user.findFirst({
            where: {
                id: userId
            },
            include: {
                orders: {
                    where: {
                        id: orderId
                    }
                }
            }
        });
        let mail = users.email;
        let order = users.orders[0].id;

        mailer('minilepin@gmail.com', order);

        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
})

function mailer(clientEmail, orderId) {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "minilepin@gmail.com",
            pass: process.env.MDP
        }
    });
    let mailOptions = {
        from: 'minilepin@gmail.com',
        to: clientEmail,
        subject: 'Order n°538',
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
