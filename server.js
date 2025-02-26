const express = require("express");
const path = require("path");
const md5 = require("md5");

const client = require("./db");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

app.get("/login", (req, res) => {
	res.sendFile(__dirname + "/views/login.html");
});

// Vulnerable login code
app.post("/login", async (req, res) => {
	const { username, password } = req.body;
	// Use an easily breakable hash function
	const password_hashed = md5(password);
	const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password_hashed}'`;
	console.log(query);
});

const port = process.env.PORT || 3000;
// TODO: Change this if we want more hints to be around
if (process.env.NODE_ENV === 'production') {
	console.log('Production Mode');
	console.error = () => {};
	console.debug = () => {};
	port = 8080;
} else {
	console.log('Development Mode');
	console.log('.env', process.env);
}

app.listen(port, () => console.log(`Running on port '${port}'`));
