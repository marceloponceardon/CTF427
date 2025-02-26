const express = require("express");
const path = require("path");
const md5 = require("md5");
const session = require("express-session");

const client = require("./db");

const app = express();

// public
app.use(express.static(path.join(__dirname, "public")));
// sessions
app.use(session({
	secret: process.env.SESSION_SECRET || "super-secret",
	resave: false,
	saveUninitialized: true,
	cookie: { secure: process.env.NODE_ENV === 'production' }
}));
// body parser
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

	// Execute the query
	console.log("Query:", query);
	// TODO: Actually do the query
	
});

function auth(req, res, next) {
	if (req.session.auth) {
		next();
	} else {
		res.status(401).send("Unauthorized >:(. Please <a href='/login'>login</a> first.");
	}
}

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
