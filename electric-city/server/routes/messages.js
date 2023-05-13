// dans le fichier routes.js
const express = require('express');
const router = express.Router();
const db = require("../utils/db.server.ts");


router.post('/', async (req, res) => {
  const { email, message } = req.body;
  console.log('tout marche ' + email + ' ' + message);

  try {
    const newMessage = await db.messages.create({
      data: {
        email : email,
        message : message,
      },
    });

    res.json(newMessage);
  } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
})

module.exports = router;