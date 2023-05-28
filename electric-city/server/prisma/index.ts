import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const db = require("../utils/db.server");

async function main() {
	// ... you will write your Prisma Client queries here
	const allUsers = await db.User.findMany();
	console.log(allUsers);
}

main()
	.then(async () => {
		await db.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await db.$disconnect();
		process.exit(1);
	});
