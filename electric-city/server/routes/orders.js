const router = require("express").Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const path = require("path");
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "storage/");
	},
	filename: (req, file, cb) => {
		const originalName = file.originalname;
		const extension = path.extname(originalName);
		const uniqueFileName = Date.now() + extension;
		cb(null, uniqueFileName);
	},
});
const adminStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "adminStorage/");
	},
	filename: (req, file, cb) => {
		const originalName = file.originalname;
		const extension = path.extname(originalName);
		const uniqueFileName = Date.now() + extension;
		cb(null, uniqueFileName);
	},
});
const [authenticateToken] = require("../middleware/auth");
const upload = multer({ storage: storage }).single("audioFile");
const uploadAdmin = multer({ storage: adminStorage }).single("audioFile");
const db = require("../utils/db.server.ts");

router.post("/order", upload, async (req, res) => {
	const { songName, description, typeMastering, price, accessToken } = req.body;
	const { email } = jwt.decode(accessToken);
	const track = req.file;
	console.log(track);
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
			select: {
				client: {
					select: {
						email: true,
					},
				},
				id: true,
			},
		});
		res.json({
			message: "Order created",
			newOrder,
		});
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
				status: true,
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
				status: true,
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

router.get("/details/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const order = await db.Order.findUnique({
			where: {
				id: id,
			},
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
				status: true,
			},
		});
		res.json(order);
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
});

router.put("/status/edit", async (req, res) => {
	const { id, status } = req.body;
	try {
		const updateStatus = await db.Order.update({
			where: {
				id: id,
			},
			data: {
				status: status,
			},
		});
		res.json({ message: "Successfully updated status" });
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
});

router.put("/admin/upload", uploadAdmin, async (req, res) => {
	const { orderId } = req.body;
	const track = req.file;
	console.log(orderId);

	try {
		const uploadFile = await db.Order.update({
			where: {
				id: orderId,
			},
			data: {
				masteredFile: track.path,
			},
		});
		res.json({ message: "Successfully uploaded file" });
	} catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
});

router.post("/admin/download", async (req, res) => {
	const filename = req.body.file;
	res.download("./" + filename); // ./storage/file.file
	res.status(200);
});
router.post("/download", async (req, res) => {
	const filename = req.body.file;
	res.download("./" + filename); // ./storage/file.file
	res.status(200);
});

module.exports = router;
