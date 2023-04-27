const router = require("express").Router();
const bcrypt = require("bcrypt");
const [authenticateToken, generateAccessToken] = require("../middleware/auth");
const users = [];

router.post("/signup", async (req, res) => {
	const { email, password } = req.body;
	const user = { email, password, user_type: "user" };
	if (users.find((user) => user.email === email)) {
		return res.status(400).json({ errors: [{ msg: "User already exists" }] });
	}
	user.password = await bcrypt.hash(password, 10);
	users.push(user);
	const accessToken = generateAccessToken(user);
	res.json({ accessToken: accessToken, user: user });
});

router.post("/login", async (req, res) => {
	const user = users.find((user) => user.email === req.body.email);
	if (user == null) {
		return res.status(400).json({ errors: [{ msg: "User not found" }] });
	}
	try {
		if (await bcrypt.compare(req.body.password, user.password)) {
			const accessToken = generateAccessToken(user);
			res.json({ accessToken: accessToken, user: user });
		} else {
			res.json({ errors: [{ msg: "Invalid credentials" }] });
		}
	} catch {
		res.status(500).send();
	}
});

router.get("/all", authenticateToken, (req, res) => {
	res.json(users);
});

module.exports = router;
