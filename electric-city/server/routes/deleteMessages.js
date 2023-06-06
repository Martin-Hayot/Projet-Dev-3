const express = require('express')
const router = express.Router()
const db = require("../utils/db.server.ts")

router.put("/", async (req, res) => {
    const { id } = req.body;
    
    if (!id) {
        return res.status(400).json({ error: "il manque l'id" });
    }

    console.log(id);
    console.log("c'est bien arrivé")
    
    try {
        const deleteMessages = await db.Messages.delete({
            where: { id: id },
        });

        if (deleteMessages == null || deleteMessages == 0) {
            return res.status(400).json({ error: 'aucun message avec cette id' });
        }

        res.json({
            ok: "nickel"
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }
})

module.exports = router
