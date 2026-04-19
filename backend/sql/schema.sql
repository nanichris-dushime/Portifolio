CREATE DATABASE IF NOT EXISTS portfolio_db;
USE portfolio_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  technologies VARCHAR(255) NOT NULL,
  github_link VARCHAR(255) NOT NULL,
  live_link VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO projects (title, description, technologies, github_link, live_link, image_url)
VALUES
  (
    'Smart Scheduling System',
    'A scheduling platform for organizations that helps manage appointments, time slots, and user flows with a clean dashboard experience and backend logic.',
    'JavaScript, Node.js, Express, MySQL',
    'https://github.com/your-username/smart-scheduling-system',
    'https://your-live-demo.com/smart-scheduling-system',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80'
  ),
  (
    'Fashion Store E-Commerce',
    'An online fashion and shoe store with structured product pages, shopping flow, and payment integration planning for MoMo Pay, PayPal, and Visa.',
    'HTML, CSS, JavaScript, Node.js, MySQL',
    'https://github.com/your-username/fashion-store',
    'https://your-live-demo.com/fashion-store',
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80'
  ),
  (
    'Bookit Bus Ticket Platform',
    'A bus booking platform that allows users to search routes, reserve seats, and manage ticket data with an organized user flow and backend structure.',
    'JavaScript, Express, Node.js, MySQL',
    'https://github.com/your-username/bookit',
    'https://your-live-demo.com/bookit',
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80'
  ),
  (
    'Medical Appointment Backend',
    'A role-based backend system for admin, doctor, and patient workflows with authentication, appointments, and modular API architecture.',
    'Node.js, Express, MySQL, REST API',
    'https://github.com/your-username/medical-appointments-api',
    'https://your-live-demo.com/medical-appointments-api',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80'
  );
