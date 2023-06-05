const router = require("express").Router();
const [authenticateToken, generateAccessToken] = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const db = require("../utils/db.server.ts");

router.post("/appointments", async (req, res) => {
	const { accessToken, description, date, nbrTrack } = req.body;
	if (!accessToken) {
		return res.json({
			errors: { msg: "Token not found" },
			authenticated: false,
		});
	}
	const { email } = jwt.decode(accessToken);
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
				nbrOfTrack: Number(nbrTrack),
				client: {
					connect: { id: getClientId.id },
				},
			},
		});
		res.json({ status: "success" });
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

router.get("/appointments", async (req, res) => {
	const accessToken = req.headers.authorization;
	if (!accessToken) {
		return res.json({
			errors: { msg: "Token not found" },
			authenticated: false,
		});
	}
	const { email } = jwt.decode(accessToken);
	try {
		const getClientId = await db.User.findUnique({
			where: {
				email: email,
			},
			select: {
				id: true,
			},
		});
		const getMeeting = await db.agenda.findMany({
			where: {
				clientId: getClientId.id,
			},
			select: {
				id: true,
				date: true,
				description: true,
				nbrOfTrack: true,
			},
			orderBy: {
				date: "asc",
			},
		});
		res.json({ data: getMeeting, status: "success" });
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

router.get("/appointments/all", async (req, res) => {
	try {
		const allMeetings = await db.agenda.findMany({
			select: {
				date: true,
				description: true,
				nbrOfTrack: true,
				id: true

			},
		});
		res.json({ data: allMeetings, status: "success" });
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
});

module.exports = router;
