const request = require("supertest")
const baseURL = "http://localhost:3001/api"
const [authenticateToken, generateAccessToken] = require("../middleware/auth");
const db = require("../utils/db.server.ts")

describe("POST /api/mail/order", () => {
    let emptyReq = {};
    let missingClientFieldReq = null;
    let missingEmailFieldReq = null;
    let missingIdFieldReq = null;
    let wrongEmailReq = null;
    let wrongIdReq = null;
    let goodReq = null;

    beforeAll(async () => {
        const email = "Jane@Doe.com";
        const user = { email, user_type: "user" };
        const accessToken = generateAccessToken(user);
        const newUser = await db.user.create({
            data: {
                firstname: "Jane",
                lastname: "Doe",
                email: email,
                password: "DoeJane",
                accessToken: accessToken,
            },
            select: {
                id: true,
                email: true
            }
        });
        goodReq = await db.order.create({
            data: {
                masteringType: "Mastering",
                songName: "SongName",
                clientFile: "Path",
                client: {
                    connect: {id: newUser.id},
                },
            },
            select: {
                client: {
                    select: {
                        email: true,
                    },
                },
                id: true,
            }
        });
        emptyReq = {};
        missingClientFieldReq = deleteClientField(goodReq);
        missingEmailFieldReq = deleteEmailField(goodReq);
        missingIdFieldReq = deleteIdField(goodReq)
        wrongEmailReq = wrongEmailField(goodReq);
        wrongIdReq = wrongIdField(goodReq);
    });

    afterAll(async () => {
        await db.order.delete({
            where: {
                id: goodReq.id
            }
        });
        await db.user.delete({
            where: {
                email: "Jane@Doe.com"
            }
        });
    });

    it("Should send an bad request", async () => {
        const response = await request(baseURL).post("/mail/order").send(emptyReq);
        expect(response.statusCode).toBe(400);
    });
    it("Should send an bad request", async () => {
        const response = await request(baseURL).post("/mail/order").send(missingClientFieldReq);
        expect(response.statusCode).toBe(400);
    });
    it("Should send an bad request", async () => {
        const response = await request(baseURL).post("/mail/order").send(missingEmailFieldReq);
        expect(response.statusCode).toBe(400);
    });
    it("Should send an bad request", async () => {
        const response = await request(baseURL).post("/mail/order").send(missingIdFieldReq);
        expect(response.statusCode).toBe(400);
    });
    it("Should send an bad request", async () => {
        const response = await request(baseURL).post("/mail/order").send(wrongEmailReq);
        expect(response.statusCode).toBe(400);
    });
    it("Should send an bad request", async () => {
        const response = await request(baseURL).post("/mail/order").send(wrongIdReq);
        expect(response.statusCode).toBe(400);
    });
    it("should send an email to the passed email address", async () => {
        const response = await request(baseURL).post("/mail/order").send(goodReq);
        expect(response.statusCode).toBe(204);
    });
});

function deleteClientField(bodyReq) {
    const modifiedReq = JSON.parse(JSON.stringify(bodyReq));
    delete modifiedReq.client;
    return modifiedReq
}

function deleteEmailField(bodyReq) {
    const modifiedReq = JSON.parse(JSON.stringify(bodyReq));
    delete modifiedReq.client.email;
    return modifiedReq
}

function deleteIdField(bodyReq) {
    const modifiedReq = JSON.parse(JSON.stringify(bodyReq));
    delete modifiedReq.id;
    return modifiedReq
}

function wrongEmailField(bodyReq) {
    const modifiedReq = JSON.parse(JSON.stringify(bodyReq));
    modifiedReq.client.email = "WRONG"
    return modifiedReq
}

function wrongIdField(bodyReq) {
    const modifiedReq = JSON.parse(JSON.stringify(bodyReq));
    modifiedReq.id = "WRONG"
    return modifiedReq
}