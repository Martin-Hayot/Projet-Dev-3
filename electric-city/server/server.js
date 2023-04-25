require("dotenv").config();
const express = require("express");
const cors = require("cors");
const auth = require("./routes/auth");
const command = require("./routes/user");
const [authenticateToken, generateAccessToken] = require("./middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "storage/" });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/auth", auth);
app.use("/api/user", command);

app.post(
	"/api/upload",
	authenticateToken,
	upload.single("file"),
	(req, res) => {
		res.redirect("/");
	}
);

app.post("/api/download", (req, res) => {
	res.download(__dirname + "/storage/" + req.body.file, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("File downloaded successfully.");
		}
	});
});

app.listen(3001, () => {
	console.log("listening on port 3001");
});
