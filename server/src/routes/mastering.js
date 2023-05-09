const express = require('express')
const router = express.Router()
const db = require("../utils/db.server.ts")

router.get("/mastering", async (req, res) => {
    try {
        const masterings = await db.mastering.findMany();

        res.json(masterings);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
})

module.exports = router
