const express = require("express");
const pg = require("pg");
const path = require("path");
const md5 = require("md5");
const session = require("express-session");
const ejs = require("ejs");
const fs = require("fs");

require("dotenv").config();

// database
const pool = new pg.Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	port: 5432,
	ssl: { rejectUnauthorized: false },
});

// Test connection
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
// admin
function admin(req, res, next) {
	if (req.session.user.isAdmin) {
		next();
	} else {
		res.status(403).sendFile(__dirname + "/views/unauthorized.html");
	}
}
// logger
app.use((req, res, next) => {
	console.log(res.statusCode, req.method, req.url);
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
app.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body;
		// Use an easily breakable hash function
		const password_hashed = md5(password);
		const query = `SELECT * FROM users WHERE username = '${username}' AND password_hashed = '${password_hashed}'`;
		// Execute the query
		console.log("Query:", query);
		const result = await pool.query(query);
	
		if (result.rows.length === 0) {
			console.log("User: ", username, "failed to authenticate");
			res.status(401).sendFile(__dirname + "/views/unauthorized.html");
			return;
		}
	
		// Otherwise, extract username and id from the result
		const { id } = result.rows[0];
	
		// Check if user is an admin
		const admin_query = `SELECT * FROM admins WHERE user_id = ${id}`;
		const admin_result = await pool.query(admin_query);
		const isAdmin = admin_result.rows.length > 0;
	
		// On success store info in session
		req.session.auth = true;
		req.session.user = {
			username: username,
			isAdmin: isAdmin,
			email: `${username}@h4ck3rs.evil`,
			joinedDate: new Date().toDateString()
		};
	
		console.log("User: ", req.session.user.username, "authenticated");
		res.redirect("/dashboard");
	} catch (err) {
		// Handle error with the error handler middleware
		next(err);
	}
});

// dashboard
app.get("/dashboard", auth, (req, res) => {
	res.render("dashboard", { user: req.session.user });
});

app.post("/dashboard/new", auth, (req, res) => {
	// success and don't do navigate away
	req.session.success = "Successfully created a new post!";
	res.redirect("/dashboard");
});

// profile
app.get("/profile", auth, (req, res) => {
	const success = req.session.success;
	delete req.session.success;
	res.render("profile", { user: req.session.user, success: success });
});

// update profile
app.post("/profile/update", auth, (req, res) => {
	// Should just do a javascript alert
	req.session.success = "Profile updating is not available at this time due to a database security issue.";
	res.redirect("/profile");
});

// logout
app.get("/logout", (req, res) => {
	req.session.destroy();
	res.render("logout");
});

// admin
app.get("/admin",	auth, admin, (req, res) => {
	const uploadDir = path.join(__dirname, "uploads");
	fs.readdir(uploadDir, (err, files) => {
		if (err) {
			console.error(err);
			res.status(500).send("Internal Server Error");
		}
		res.render("admin", { 
			user: req.session.user,
			files: files
		});
	});
});

// download
app.get("/download/:file", auth, admin, (req, res) => {
	const filename = req.params.file;
	const filePath = path.join(__dirname, "uploads", filename);

	if (fs.existsSync(filePath)) {
		res.download(filePath, filename);
	} else {
		res.status(404).send("File not found");
	}
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

// error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	console.log("Error encountered! Redirecting to error page");
	res.status(500).render("error", { error: err });
});

app.listen(port, '0.0.0.0', () => console.log(`Running on port '${port}'`));
