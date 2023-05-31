const router = require("express").Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "storage/");
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});
const adminStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "adminStorage/");
	},
});
const [authenticateToken] = require("../middleware/auth");
const upload = multer({ storage: storage }).single("audioFile");
const uploadAdmin = multer({ adminStorage: adminStorage }).single("audioFile");
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
				clientFile: track.path,
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

router.get("/", authenticateToken, async (req, res) => {
	const { email } = req.accessToken;

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
				clientId: true,
				masteredFile: true,
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
				clientFile: true,
				clientId: true,
				masteredFile: true,
			},
			orderBy: {
				createdAt: "asc",
			},
		});
		res.json(orders);
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
});

router.post("/admin/upload", uploadAdmin, (req, res) => {
	res.json({ message: "Successfully uploaded files" });
});

router.post("/admin/download", async (req, res) => {
	const filename = req.body.file;
	res.download("./" + filename); // ./storage/file.file
	res.status(200);
});

module.exports = router;
