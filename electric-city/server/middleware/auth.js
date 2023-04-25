const jwt = require("jsonwebtoken");

async function authenticateToken(req, res, next) {
	const token = req.header("x-auth-token");
	if (!token) {
		return res.status(400).json({ errors: [{ msg: "Token not found" }] });
	}
	try {
		const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		req.user = user;
		next();
	} catch (error) {
		return res.status(400).json({ errors: [{ msg: "Token not valid" }] });
	}
}

function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "30min",
	});
}

module.exports = [authenticateToken, generateAccessToken];
