const router = require("express").Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "storage/");
	},
});
const upload = multer({ storage: storage }).single("audioFile");
const db = require("../utils/db.server.ts");

router.post("/order", upload, async (req, res) => {
	const { songName, description, typeMastering, price, accessToken } = req.body;
	const { email } = jwt.decode(accessToken);
	console.log(email);
	const track = req.file;
	try {
		const getClientId = await db.User.findUnique({
			where: {
				email: email,
			},
			select: {
				id: true,
			},
		});
		const newOrder = await db.Order.create({
			data: {
				feedback: description,
				price: Number(price),
				masteringType: typeMastering,
				songName: songName,
				filePath: track.path,
				client: {
					connect: { id: getClientId.id },
				},
			},
		});
		res.json({ message: "Order created" });
	} catch (e) {
		console.log(e);
		res.status(500).json(e);

		// Do something with the form data and uploaded files
	}
});

router.get("/", async (req, res) => {
	const accessToken = req.headers.authorization;
	const { email } = jwt.decode(accessToken);

	try {
		const orders = await db.Order.findMany({
			where: {
				client: {
					email: email,
				},
			},
			select: {
				id: true,
				songName: true,
				feedback: true,
				price: true,
				masteringType: true,
				createdAt: true,
			},
		});
		res.json(orders);
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
});

router.get("/admin", async (req, res) => {
	try {
		const orders = await db.Order.findMany({
			select: {
				id: true,
				songName: true,
				feedback: true,
				price: true,
				masteringType: true,
				createdAt: true,
				filePath: true,
			},
		});
		res.json(orders);
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
});

module.exports = router;
