const express = require('express')
const router = express.Router()
const db = require("../utils/db.server.ts")

router.get("/order", async (req, res) => {
    try {
        const orders = await db.order.findMany();

        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        })
    }
})

module.exports = router
