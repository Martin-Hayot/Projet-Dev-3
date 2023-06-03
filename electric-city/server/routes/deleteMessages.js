const express = require('express')
const router = express.Router()
const db = require("../utils/db.server.ts")

router.put("/", async (req, res) => {
    const { id } = req.body;
    console.log(id);
    console.log("c'est bien arrivé")
	try {
		const deleteMessages = await db.Messages.delete({
			where: { id: id },
		});

		if (deleteMessages == null) {
			return res.status(400).json({ errors });
		}

		res.json({
			ok: "nickel"
		});
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
})

module.exports = router