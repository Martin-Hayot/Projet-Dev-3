const router = require("express").Router();
const bcrypt = require("bcrypt");
const [authenticateToken, generateAccessToken] = require("../middleware/auth");
const db = require("../utils/db.server.ts");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
	let { email, password, firstname, lastname } = req.body;
	const user = { email, user_type: "user" };
	try {
		const searchedUser = await db.User.findUnique({
			where: {
				email: email,
			},
		});
		if (searchedUser !== null) {
			return res.status(400).json({ errors: [{ msg: "User already exists" }] });
		}
		password = await bcrypt.hash(password, 10);
		const accessToken = generateAccessToken(user);
		const newUser = await db.User.create({
			data: {
				firstname: firstname,
				lastname: lastname,
				email: email,
				password: password,
				accessToken: accessToken,
			},
		});
		console.log(newUser);
		res.json({
			accessToken: accessToken,
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

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const user = { email, user_type: "USER" };
	try {
		const searchedUser = await db.User.findUnique({
			where: {
				email: user.email,
			},
			select: {
				email: true,
				password: true,
				role: true,
			},
		});
		if (searchedUser == null) {
			return res.status(400).json({ errors: [{ msg: "User not found" }] });
		}
		if (searchedUser.role === "ADMIN") {
			user.user_type = "ADMIN";
		} else {
			user.user_type = "USER";
		}
		if (await bcrypt.compare(password, searchedUser.password)) {
			const accessToken = generateAccessToken(user);
			const updateToken = await db.User.update({
				where: {
					email: user.email,
				},
				data: {
					accessToken: accessToken,
				},
			});
			res.json({
				accessToken: accessToken,
				email: user.email,
				role: user.user_type,
			});
		} else {
			res.json({ errors: [{ msg: "Invalid credentials" }] });
		}
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
});

router.get("/all", authenticateToken, async (req, res) => {
	try {
		const users = await db.user.findMany();
		console.log(users);
	} catch (e) {
		res.status(500).json(e);
	}
});

module.exports = router;
