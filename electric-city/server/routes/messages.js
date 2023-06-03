const express = require('express');
const router = express.Router();
const db = require("../utils/db.server.ts");


router.post('/', async (req, res) => {
  const { email, message } = req.body;
  console.log('tout marche ' + email + ' ' + message);
  const date = new Date();
  let currentDay= String(date.getDate()).padStart(2, '0');
  let currentMonth = String(date.getMonth()+1).padStart(2,"0");
  let currentYear = date.getFullYear();
  const currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
  console.log(currentDate);
  try {
    const newMessage = await db.messages.create({
      data: {
        email : email,
        message : message,
        date : currentDate,
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