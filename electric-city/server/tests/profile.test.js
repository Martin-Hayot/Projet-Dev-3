const axios = require("axios");
const db = require("../utils/db.server.ts");
let oldAccessToken = "";
let newAccessToken = "";

beforeAll(async () => {
	const deleteUser = await db.User.deleteMany({});
	const responseUser = await axios.post(
		"http://localhost:3001/api/auth/signup",
		{
			email: "test@example.com",
			password: "password123",
			firstname: "jhon",
			lastname: "Doe",
		}
	);
	const responseLoginOld = await axios.post(
		"http://localhost:3001/api/auth/login",
		{
			email: responseUser.data.email,
			password: "password123",
		}
	);
	oldAccessToken = responseLoginOld.data.accessToken;
});

afterAll(async () => {});

describe("road to profile", () => {
	test("GET /", async () => {
		const response = await axios.get("http://localhost:3001/api/profile/", {
			headers: { Authorization: oldAccessToken },
		});
		expect(response.data).toEqual({
			email: "test@example.com",
			firstname: "jhon",
			lastname: "Doe",
		});
	});
});

describe("road to profile", () => {
	test("PUT /edit", async () => {
		const response = await axios.put("http://localhost:3001/api/profile/edit", {
			email: "test@example.be",
			firstname: "quentin",
			lastname: "dupont",
			password: "password321",
			accessToken: oldAccessToken,
		});
		newAccessToken = response.data.accessToken;
		expect(response.data).toEqual({
			accessToken: expect.any(String),
			email: "test@example.be",
			user_type: "USER",
			firstname: "quentin",
			lastname: "dupont",
		});
	});
});

describe("road to profile", () => {
	test("GET /", async () => {
		const response = await axios.get("http://localhost:3001/api/profile/", {
			headers: { Authorization: newAccessToken },
		});
		expect(response.data).toEqual({
			email: "test@example.be",
			firstname: "quentin",
			lastname: "dupont",
		});
	});
});
