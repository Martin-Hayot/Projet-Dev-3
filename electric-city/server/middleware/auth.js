const jwt = require("jsonwebtoken");

async function authenticateToken(req, res, next) {
	const token = req.headers.authorization;
	if (!token) {
		return res.json({
			errors: { msg: "Token not found" },
			authenticated: false,
		});
	}
	try {
		const accessToken = await jwt.verify(
			token,
			process.env.ACCESS_TOKEN_SECRET
		);

		req.accessToken = accessToken;
		next();
	} catch (error) {
		return res.json({ errors: { msg: "Token not valid" } });
	}
}

function generateAccessToken(user) {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "30min",
	});
}

module.exports = [authenticateToken, generateAccessToken];
