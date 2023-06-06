const axios = require("axios");
let oldAccessToken = "";

beforeAll(async () => {
	const responseLoginOld = await axios.post(
		"http://localhost:3001/api/auth/login",
		{
			email: "test@example.com",
			password: "password123",
		}
	);
	oldAccessToken = responseLoginOld.data.accessToken;
});

describe("road to orders", () => {
	test("PUT /status/edit", async () => {
		const response = await axios.put("http://localhost:3001/api/profile/edit", {
			email: "test@example.be",
			firstname: "quentin",
			lastname: "dupont",
			password: "password321",
			accessToken: oldAccessToken,
		});
		expect(response.data).toEqual({
			accessToken: expect.any(String),
			email: "test@example.be",
			user_type: "USER",
			firstname: "quentin",
			lastname: "dupont",
		});
	});
});
