-- Drop existing tables if they exist
DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	password_hashed TEXT NOT NULL
);

-- Insert sample users with MD5 hashed passwords
INSERT INTO users (username, password_hashed) VALUES
	('alice', MD5('alice123')),
	('bob', MD5('bob123')),
	('charlie', MD5('charlie123')),
	('dave', MD5('dave123')),
	('eve', MD5('eve123')),
	('frank', MD5('frank123')),
	('grace', MD5('grace123')),
	('heidi', MD5('heidi123')),
	('ivan', MD5('ivan123')),
	('judy', MD5('judy123')),
	('kate', MD5('kate123')),
	('larry', MD5('larry123')),
	('mike', MD5('mike123')),
	('nancy', MD5('nancy123')),
	('oliver', MD5('oliver123')),
	('patty', MD5('patty123')),
	('quincy', MD5('quincy123')),
	('roger', MD5('roger123')),
	('sally', MD5('sally123')),
	('tom', MD5('tom123')),
	('ursula', MD5('ursula123')),
	('victor', MD5('victor123')),
	('wendy', MD5('wendy123')),
	('xavier', MD5('xavier123')),
	('yvonne', MD5('yvonne123')),
	('zack', MD5('zack123')),
	('admin', MD5('admin123')); -- Example admin user

-- Create admins table
CREATE TABLE admins (
	user_id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE
);

-- Insert 'admin' into the admins table
INSERT INTO admins (user_id)
SELECT id FROM users WHERE username = 'admin';
