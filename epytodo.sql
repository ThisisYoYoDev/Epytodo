SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = OFF;
START TRANSACTION;
SET TIME_ZONE = "+00:00";

DROP DATABASE IF EXISTS epytodo;
CREATE DATABASE epytodo;
USE epytodo;

DROP TABLE IF EXISTS user;
CREATE TABLE IF NOT EXISTS user (
    id INT(2) UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT current_timestamp(),
    firstname VARCHAR(20) NOT NULL,
    name VARCHAR(20) NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

DROP TABLE IF EXISTS todo;
CREATE TABLE IF NOT EXISTS todo (
    id INT(2) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    created_at DATETIME DEFAULT current_timestamp(),
    due_time DATETIME NOT NULL,
    status ENUM('not started', 'todo', 'in progress', 'done') NOT NULL DEFAULT 'not started',
    user_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
);