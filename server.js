const express = require("express");
const client = require("./db");
const md5 = require("md5");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendfile(__dirname + "/views/index.html");
});

app.get("/login", (req, res) => {
	res.sendfile(__dirname + "/views/login.html");
});

// Vulnerable login code
app.post("/login", async (req, res) => {
	const { username, password } = req.body;
	// Use an easily breakable hash function
	const password_hashed = md5(password);
	const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password_hashed}'`;
	console.log(query);
});

const port = 3000;
app.listen(port, () => console.log(`Hacker forum running on port '${port}'`));
