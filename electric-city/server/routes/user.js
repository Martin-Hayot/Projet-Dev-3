const router = require("express").Router();
const [authenticateToken, generateAccessToken] = require("../middleware/auth");

commands = [
	{
		user: "mart.hyt2002@gmail.com",
		commands: [
			{ command_type: "master", project_name: "electrodrip" },
			{ command_type: "master", project_name: "dive" },
		],
	},
];

router.get("/commands", authenticateToken, (req, res) => {
	const { user } = req;
	const userCommands = commands;
	res.json(userCommands.find((command) => command.user === user.email));
});

module.exports = router;
