const router = require("express").Router();
const bcrypt = require("bcrypt");
const [authenticateToken, generateAccessToken] = require("../middleware/auth");
const db = require("../utils/db.server.ts");

router.post("/signup", async (req, res) => {
	const { email, password, firstname, lastname } = req.body;
	const user = { email, password, user_type: "user", firstname, lastname };
	try {
		const searchedUser = await db.users.findUnique({
			where: {
				email: email,
			},
		});
		if (searchedUser !== null) {
			return res.status(400).json({ errors: [{ msg: "User already exists" }] });
		}
		user.password = await bcrypt.hash(password, 10);
		const accessToken = generateAccessToken(user);
		const newUser = await db.users.create({
			data: {
				firstname: firstname,
				lastname: lastname,
				email: user.email,
				password: user.password,
				access_token: accessToken,
			},
		});
		console.log(newUser);
		res.json({
			accessToken: accessToken,
			email: user.email,
			user_type: user.user_type,
			firstname: user.firstname,
			lastname: user.lastname,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
});

router.post("/login", async (req, res) => {
	const user = { email: req.body.email, password: req.body.password };
	try {
		const searchedUser = await db.users.findUnique({
			where: {
				email: user.email,
			},
			select: {
				email: true,
				password: true,
				isAdmin: true,
			},
		});
		if (searchedUser == null) {
			return res.status(400).json({ errors: [{ msg: "User not found" }] });
		}
		if (searchedUser.isAdmin) {
			user.user_type = "admin";
		} else {
			user.user_type = "user";
		}
		if (await bcrypt.compare(user.password, searchedUser.password)) {
			const accessToken = generateAccessToken(user);
			const updateToken = await db.users.update({
				where: {
					email: user.email,
				},
				data: {
					access_token: accessToken,
				},
			});
			res.json({
				accessToken: accessToken,
				email: user.email,
				user_type: user.user_type,
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
