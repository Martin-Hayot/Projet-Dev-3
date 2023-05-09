const express = require('express')
const router = express.Router()
const db = require("../utils/db.server.ts")

router.get("/agenda", async (req, res) => {
    try {
        const meetings = await db.agenda.findMany();

        res.json(meetings);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
})

module.exports = router
