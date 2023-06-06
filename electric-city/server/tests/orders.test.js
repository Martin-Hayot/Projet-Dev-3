const axios = require("axios");
const db = require("../utils/db.server.ts");
const fs = require("fs");
const filePathOriginal =
	"C:/Users/Martin_h/Desktop/Projet-Dev-3/electric-city/server/storage/track.mp3";
const filePathMastered =
	"C:/Users/Martin_h/Desktop/Projet-Dev-3/electric-city/server/adminStorage/track-mastered.mp3";
let email = "";
let accessToken = "";
let orderId = "";
let clientId = "";
beforeAll(async () => {
	const deleteOrders = await db.Order.deleteMany({});
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
	test("POST /admin/download", async () => {
		const response = await axios.post(
			"http://localhost:3001/api/orders/admin/download",
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
