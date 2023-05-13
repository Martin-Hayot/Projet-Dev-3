require("dotenv").config();
const express = require("express");
const cors = require("cors");
const auth = require("./routes/auth");
const command = require("./routes/user");
const messages = require("./routes/messages");
const [authenticateToken, generateAccessToken] = require("./middleware/auth");
const multer = require("multer");
const upload = multer({ dest: "storage/" });
const app = express();
const adminMessages = require("./routes/adminMessages");


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/auth", auth);
app.use("/api/user", command);
app.use("/submit", messages);
app.use("/display", adminMessages);


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

app.get('/', (req, res) => {
	res.render('index');
});
  
/*app.post('/submit', (req, res) => {
	const { email, message } = req.body;
	console.log(`Email: ${email}`);
	console.log(`Message: ${message}`);
	res.send('Formulaire soumis avec succès !');
});*/
  
  

app.listen(3001, () => {
	console.log("listening on port 3001");
});
