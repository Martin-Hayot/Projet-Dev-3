const express = require('express')
const router = express.Router()
const db = require("../utils/db.server.ts")

router.get("/user", async (req, res) => {
    try {
        const users = await db.user.findMany();

        res.json(users);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
})

module.exports = router
