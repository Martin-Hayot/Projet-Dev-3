const express = require('express')
const router = express.Router()
const db = require("../utils/db.server.ts")

router.get("/", async (req, res) => {
    console.log("test");

    try {
        const messages = await db.messages.findMany();
        res.json(messages);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
})

module.exports = router