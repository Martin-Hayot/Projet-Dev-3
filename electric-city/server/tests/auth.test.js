const axios = require("axios");
const db = require("../utils/db.server.ts");
let accessToken = "";
let accessTokenAdmin = "";

beforeAll(async () => {
	const deleteUser = await db.User.deleteMany({});
	const response = await axios.post("http://localhost:3001/api/auth/signup", {
		email: "admin@admin.com",
		password: "admin123",
		firstname: "admin",
		lastname: "admin",
	});
	const editRoleUser = await db.User.update({
		where: {
			email: "admin@admin.com",
		},
		data: {
			role: "ADMIN",
		},
	});
});
afterAll(async () => {
	const deleteUser = await db.User.deleteMany({});
});

describe("road to auth", () => {
	test("POST /signup", async () => {
		const response = await axios.post("http://localhost:3001/api/auth/signup", {
			email: "test@example.com",
			password: "password123",
			firstname: "jhon",
			lastname: "Doe",
		});
		expect(response.data).toEqual({
			email: "test@example.com",
			user_type: "USER",
			firstname: "jhon",
			lastname: "Doe",
		});
	});
	test("POST /signup error user already exist", async () => {
		const response = await axios.post("http://localhost:3001/api/auth/signup", {
			email: "test@example.com",
			password: "password123",
			firstname: "jhon",
			lastname: "Doe",
		});
		expect(response.data).toEqual({ errors: { msg: "User already exists" } });
	});
});

describe("road to auth", () => {
	test("POST /login", async () => {
		const response = await axios.post("http://localhost:3001/api/auth/login", {
			email: "test@example.com",
			password: "password123",
		});
		accessToken = response.data.accessToken;
		expect(response.data).toEqual(
			expect.objectContaining({
				email: "test@example.com",
				role: "USER",
			})
		);
		accessToken = response.data.accessToken;
	});
});

describe("road to auth", () => {
	test("POST /login error password", async () => {
		const response = await axios.post("http://localhost:3001/api/auth/login", {
			email: "test@example.com",
			password: "password",
		});
		expect(response.data).toEqual({ errors: { msg: "Invalid credentials" } });
	});
});

describe("road to auth ", () => {
	test("POST /login error email", async () => {
		const response = await axios.post("http://localhost:3001/api/auth/login", {
			email: "test@error.com",
			password: "password123",
		});
		expect(response.data).toEqual({ errors: { msg: "User not found" } });
	});
});

describe("road to auth", () => {
	test("POST /login", async () => {
		const response = await axios.post("http://localhost:3001/api/auth/login", {
			email: "admin@admin.com",
			password: "admin123",
		});
		accessTokenAdmin = response.data.accessToken;
		expect(response.data).toEqual(
			expect.objectContaining({
				email: "admin@admin.com",
				role: "ADMIN",
			})
		);
		accessTokenAdmin = response.data.accessToken;
	});
});

describe("road to auth", () => {
	test("GET /role", async () => {
		const response = await axios.get("http://localhost:3001/api/auth/role", {
			headers: { Authorization: accessToken },
		});
		expect(response.data).toEqual({
			role: "USER",
		});
	});
});

describe("road to auth", () => {
	test("GET /role", async () => {
		const response = await axios.get("http://localhost:3001/api/auth/role", {
			headers: { Authorization: accessTokenAdmin },
		});
		expect(response.data).toEqual({
			role: "ADMIN",
		});
	});
});

describe("road to auth", () => {
	test("GET /authenticate", async () => {
		const response = await axios.get(
			"http://localhost:3001/api/auth/authenticate",
			{
				headers: { Authorization: accessToken },
			}
		);
		expect(response.data).toEqual({
			authenticated: true,
		});
	});
});
