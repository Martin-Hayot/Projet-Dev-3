require("dotenv").config();
const express = require("express");
const cors = require("cors");
const auth = require("./routes/auth");
const agenda = require("./routes/agenda");
const app = express();
const orders = require("./routes/orders");
const profile = require("./routes/profile");
const messages = require("./routes/messages");
const adminMessages = require("./routes/adminMessages");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/auth", auth);
app.use("/api/orders", orders);
app.use("/api/profile", profile);
app.use("/api/agenda", agenda);
app.use("/api/messages", messages);
app.use("/api/display", adminMessages);

app.listen(3001, () => {
	console.log("listening on port 3001");
});
