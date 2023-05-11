require("dotenv").config();
const express = require("express");
const cors = require("cors");
const auth = require("./routes/auth");
const command = require("./routes/user");
const agenda = require("./routes/agenda");
const [authenticateToken] = require("./middleware/auth");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const upload = multer({ dest: "storage/" });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use("/api/auth", auth);
app.use("/api/user", command);
app.use("/api/agenda", agenda);

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
