const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../utils/db.server.ts");
const [authenticateToken, generateAccessToken] = require("../middleware/auth");

router.put("/edit", async (req, res) => {
	let { accessToken, password, firstname, lastname, email } = req.body;
	if (!accessToken) {
		return res.json({ errors: { msg: "Token not found" } });
	}
	const oldAccessToken = jwt.decode(accessToken).email;
	const user = { email, user_type: "user" };
	try {
		password = await bcrypt.hash(password, 10);
		const newAccessToken = generateAccessToken(user);
		const updateUser = await db.User.update({
			where: { email: oldAccessToken },
			data: {
				email: email,
				password: password,
				firstname: firstname,
				lastname: lastname,
				accessToken: newAccessToken,
			},
		});

		if (updateUser == null) {
			return res.status(400).json({ errors });
		}

		res.json({
			accessToken: newAccessToken,
			email: email,
			user_type: user.user_type,
			firstname: firstname,
			lastname: lastname,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
});

router.get("/", async (req, res) => {
	const accessToken = req.headers.authorization;
	if (!accessToken) {
		return res.json({ errors: { msg: "Token not found" } });
	}
	const { email } = jwt.decode(accessToken);
	try {
		const user = await db.User.findUnique({
			where: {
				email: email,
			},
			select: {
				email: true,
				firstname: true,
				lastname: true,
			},
		});
		res.json(user);
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
});
module.exports = router;
