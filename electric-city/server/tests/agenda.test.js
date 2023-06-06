const axios = require("axios");
const db = require("../utils/db.server.ts");
let accessToken = "";
let orderId = "";

beforeAll(async () => {
	const deleteAgenda = await db.Agenda.deleteMany({});
	const res = await axios.post("http://localhost:3001/api/auth/login", {
		email: "test@example.com",
		password: "password123",
	});
	accessToken = res.data.accessToken;
});

afterAll(async () => {
	const deleteAgenda = await db.Agenda.deleteMany({});
});

describe("Appointments", () => {
	test("POST /appointments", async () => {
		const response = await axios.post(
			"http://localhost:3001/api/agenda/appointments",
			{
				accessToken: accessToken,
				date: "2021-09-01",
				description: "test",
				nbrTrack: 1,
			}
		);
		expect(response.data).toEqual({
			status: "success",
		});
	});
});

describe("Appointments", () => {
	test("GET /appointments", async () => {
		const response = await axios.get(
			"http://localhost:3001/api/agenda/appointments",
			{
				headers: {
					Authorization: accessToken,
				},
			}
		);
		orderId = response.data.data[0].id;
		expect(response.data.data[0]).toEqual(
			expect.objectContaining({
				date: "2021-09-01",
				description: "test",
				nbrOfTrack: 1,
			})
		);
	});
});

describe("Appointments", () => {
	test("Get appointment details", async () => {
		const response = await axios.get(
			`http://localhost:3001/api/agenda/details/${orderId}`,
			{
				headers: {
					Authorization: accessToken,
				},
			}
		);
		expect(response.data).toEqual(
			expect.objectContaining({
				id: orderId,
				date: "2021-09-01",
				description: "test",
				nbrOfTrack: 1,
				client: {
					firstname: "jhon",
					lastname: "Doe",
					email: "test@example.com",
				},
			})
		);
	});
});

describe("Appointments", () => {
	test("GET /appointments/all", async () => {
		const response = await axios.get(
			"http://localhost:3001/api/agenda/appointments/all",
			{
				headers: {
					Authorization: accessToken,
				},
			}
		);
		expect(response.data.data[0]).toEqual({
			date: "2021-09-01",
			id: orderId,
		});
	});
});
