const express = require("express");
const pg = require("pg");
const path = require("path");
const md5 = require("md5");
const session = require("express-session");
const ejs = require("ejs");

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

// ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
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

// middleware
// auth
function auth(req, res, next) {
	if (req.session.auth) {
		next();
	} else {
		res.status(401).sendFile(__dirname + "/views/unauthorized.html");
	}
}
// logger
app.use((req, res, next) => {
	console.log(req.method, req.url);
	next();
});

// routes
// home
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

// login
app.get("/login", (req, res) => {
	res.sendFile(__dirname + "/views/login.html");
});

// register
app.get("/register", (req, res) => {
	res.sendFile(__dirname + "/views/register.html");
});

// vulnerable login
app.post("/login", async (req, res) => {
	const { username, password } = req.body;
	// Use an easily breakable hash function
	const password_hashed = md5(password);
	const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password_hashed}'`;

	// Execute the query
	console.log("Query:", query);
	// TODO: Actually do the query

	// On success store info in session
	req.session.auth = true;
	req.session.user = {
		username: username,
		isAdmin: username === "admin",
		email: `${username}@hackers.org`,
		joinedDate: new Date().toDateString()
	};

	console.log("User: ", req.session.user.username, "authenticated");
	res.redirect("/dashboard");
});

// dashboard
app.get("/dashboard", auth, (req, res) => {
	res.render("dashboard", { user: req.session.user });
});

// profile
app.get("/profile", auth, (req, res) => {
	res.render("profile", { user: req.session.user });
});

// logout
app.get("/logout", (req, res) => {
	req.session.destroy();
	res.render("logout");
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
	console.log('.env:',
		process.env.SESSION_SECRET,
		process.env.DB_USER,
		process.env.DB_PASS,
		process.env.DB_HOST,
		process.env.DB_NAME
	);
}

app.listen(port, () => console.log(`Running on port '${port}'`));
