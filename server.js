const express = require("express");
const pg = require("pg");
const path = require("path");
const md5 = require("md5");
const session = require("express-session");

require("dotenv").config();

// database
const pool = new pg.Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	port: 5432
});

pool.connect().then(client => {
	console.log("Connected to database");
	client.release();
}).catch(err => {
	console.error("Error connecting to database", err);
});

const app = express();

// public
app.use(express.static(path.join(__dirname, "public")));
// sessions
app.use(session({
	secret: process.env.SESSION_SECRET,
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
	console.log('.env:',
		process.env.SESSION_SECRET,
		process.env.DB_USER,
		process.env.DB_PASS,
		process.env.DB_HOST,
		process.env.DB_NAME
	);
}

app.listen(port, () => console.log(`Running on port '${port}'`));
