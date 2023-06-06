const axios = require("axios");
const db = require("../utils/db.server.ts");
const fs = require("fs");
const filePathOriginal = process.env.URL_FILE;
const filePathMastered = process.env.URL_MASTERED_FILE;
console.log(filePathOriginal);
console.log(filePathMastered);
let email = "";
let accessToken = "";
let orderId = "";
let clientId = "";
beforeAll(async () => {
	const deleteOrders = await db.Order.deleteMany({});
	const responseAdmin = await axios.post(
		"http://localhost:3001/api/auth/signup",
		{
			email: "admin@admin.com",
			password: "admin123",
			firstname: "admin",
			lastname: "admin",
		}
	);
	const editRoleUser = await db.User.update({
		where: {
			email: "admin@admin.com",
		},
		data: {
			role: "ADMIN",
		},
	});
	const responseUser = await axios.post(
		"http://localhost:3001/api/auth/signup",
		{
			email: "test@example.com",
			password: "password123",
			firstname: "jhon",
			lastname: "Doe",
		}
	);
	const responseLogin = await axios.post(
		"http://localhost:3001/api/auth/login",
		{
			email: "test@example.com",
			password: "password123",
		}
	);
	email = responseLogin.data.email;
	accessToken = responseLogin.data.accessToken;
	const getClientId = await db.User.findUnique({
		where: {
			email: email,
		},
		select: {
			id: true,
		},
	});
	clientId = getClientId.id;
	const newOrder = await db.Order.create({
		data: {
			feedback: "description",
			price: 85,
			masteringType: "master",
			songName: "songName",
			clientFile: "/storage/track.mp3",
			client: {
				connect: { id: getClientId.id },
			},
		},
		select: {
			client: {
				select: {
					email: true,
				},
			},
			id: true,
		},
	});
	orderId = newOrder.id;
	fs.open(filePathOriginal, "w", (err) => {
		if (err) {
			console.log(err);
			return;
		}
	});
	fs.open(filePathMastered, "w", (err) => {
		if (err) {
			console.log(err);
			return;
		}
	});
});

afterAll(async () => {
	const deleteOrders = await db.Order.deleteMany({});
	if (fs.existsSync(filePathOriginal)) {
		fs.unlink(filePathOriginal, (err) => {
			if (err) {
				console.log(err);
				return;
			}
		});
	} else {
		console.log("file doesn't exist, won't remove it");
	}
	if (fs.existsSync(filePathMastered)) {
		fs.unlink(filePathMastered, (err) => {
			if (err) {
				console.log(err);
				return;
			}
		});
	} else {
		console.log("file doesn't exist, won't remove it");
	}
	const deleteUser = await db.User.deleteMany({});
});

describe("road to orders", () => {
	test("GET /", async () => {
		const response = await axios.get("http://localhost:3001/api/orders/", {
			headers: { Authorization: accessToken },
		});
		expect(response.data).toEqual([
			{
				id: orderId,
				songName: "songName",
				feedback: "description",
				price: 85,
				masteringType: "master",
				createdAt: expect.any(String),
				clientId: clientId,
				masteredFile: "NULL",
				status: "PENDING",
			},
		]);
	});
});

describe("road to orders", () => {
	test("GET / error accessToken", async () => {
		const response = await axios.get("http://localhost:3001/api/orders/", {
			headers: { Authorization: "122121212122" },
		});
		expect(response.data).toEqual({ errors: { msg: "Token not valid" } });
	});
});

describe("road to orders", () => {
	test("GET /admin", async () => {
		const response = await axios.get("http://localhost:3001/api/orders/admin", {
			headers: { Authorization: accessToken },
		});
		expect(response.data).toEqual([
			{
				id: orderId,
				songName: "songName",
				feedback: "description",
				price: 85,
				masteringType: "master",
				createdAt: expect.any(String),
				clientFile: "/storage/track.mp3",
				clientId: clientId,
				masteredFile: "NULL",
				status: "PENDING",
			},
		]);
	});
});

describe("road to orders", () => {
	test("GET /details/:id", async () => {
		const response = await axios.get(
			"http://localhost:3001/api/orders/details/" + orderId,
			{
				headers: { Authorization: accessToken },
			}
		);
		expect(response.data).toEqual({
			id: orderId,
			songName: "songName",
			feedback: "description",
			price: 85,
			masteringType: "master",
			createdAt: expect.any(String),
			clientId: clientId,
			clientFile: "/storage/track.mp3",
			masteredFile: "NULL",
			status: "PENDING",
		});
	});
});

describe("road to orders", () => {
	test("GET /details/:id ERROR id order", async () => {
		const response = await axios.get(
			"http://localhost:3001/api/orders/details/" + "123456788",
			{
				headers: { Authorization: accessToken },
			}
		);
		expect(response.data).toEqual({ message: "Order not found", status: 204 });
	});
});

describe("road to orders", () => {
	test("PUT /status/edit", async () => {
		const response = await axios.put(
			"http://localhost:3001/api/orders/status/edit",
			{
				status: "FINISH",
				id: orderId,
			}
		);
		expect(response.data).toEqual({ message: "Successfully updated status" });
	});
});

describe("road to orders", () => {
	test("POST /download", async () => {
		const response = await axios.post(
			"http://localhost:3001/api/orders/download",
			{
				file: "/storage/track.mp3",
			}
		);
		expect(response.status).toEqual(200);
	});
});

describe("road to orders", () => {
	test("POST /admin/download", async () => {
		const response = await axios.post(
			"http://localhost:3001/api/orders/admin/download",
			{
				file: "/adminStorage/track-mastered.mp3",
			}
		);
		expect(response.status).toEqual(200);
	});
});
