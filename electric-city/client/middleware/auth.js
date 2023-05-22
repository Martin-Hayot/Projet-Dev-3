export default function () {
	const jwt = require("jsonwebtoken");
	const verifyToken = (token) => {
		try {
			return jwt.decode(JSON.parse(token));
		} catch (error) {
			// Token is invalid or couldn't be decoded
			console.log(error);
			return null;
		}
	};

	const isAuthenticated = verifyToken(localStorage.getItem("accessToken"));

	if (!isAuthenticated) {
		navigateTo("/login");
	}
}
