const router = require("express").Router();
const [authenticateToken, generateAccessToken] = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const db = require("../utils/db.server.ts");

router.post("/appointments", async (req, res) => {
	const { accessToken, description, date, nbrOfTracks } = req.body;
	const { email } = jwt.decode(JSON.parse(accessToken));
	try {
		const getClientId = await db.User.findUnique({
			where: {
				email: email,
			},
			select: {
				id: true,
			},
		});
		const newMeeting = await db.agenda.create({
			data: {
				date: date,
				description: description,
				nbrOfTrack: nbrOfTracks,
				client: {
					connect: { id: getClientId.id },
				},
			},
		});
		res.json({ status: "success" });
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
});

router.get("/appointments", async (req, res) => {
	try {
		const allMeetings = await db.agenda.findMany({
			select: {
				date: true,
				description: true,
				nbrOfTrack: true,
			},
		});
		res.json({ data: allMeetings, status: "success" });
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
});

module.exports = router;