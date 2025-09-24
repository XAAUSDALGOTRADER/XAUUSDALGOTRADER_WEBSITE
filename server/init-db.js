import sqlite3 from 'sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialize database with sample data
db.serialize(() => {
  console.log('Initializing database...');
  
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    country TEXT NOT NULL,
    mobile TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    approved_by INTEGER DEFAULT NULL,
    approved_at DATETIME DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME DEFAULT NULL,
    FOREIGN KEY (approved_by) REFERENCES admins(id)
  )`);

  // Admins table
  db.run(`CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // User approval history table
  db.run(`CREATE TABLE IF NOT EXISTS user_approval_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    admin_id INTEGER NOT NULL,
    action TEXT NOT NULL,
    reason TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (admin_id) REFERENCES admins(id)
  )`);

  // Subscription plans table
  db.run(`CREATE TABLE IF NOT EXISTS subscription_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    duration TEXT NOT NULL,
    features TEXT NOT NULL,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // User subscriptions table
  db.run(`CREATE TABLE IF NOT EXISTS user_subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    plan_id INTEGER NOT NULL,
    status TEXT DEFAULT 'active',
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id)
  )`);

  // Create default admin if not exists
  const defaultAdminEmail = 'admin@xauusdalgotrader.com';
  const defaultAdminPassword = bcrypt.hashSync('admin123', 10);
  
  db.get("SELECT id FROM admins WHERE email = ?", [defaultAdminEmail], (err, row) => {
    if (err) {
      console.error("Error checking default admin:", err);
      return;
    }
    
    if (!row) {
      db.run(
        "INSERT INTO admins (email, password, name) VALUES (?, ?, ?)",
        [defaultAdminEmail, defaultAdminPassword, 'System Administrator'],
        function(err) {
          if (err) {
            console.error("Error creating default admin:", err);
          } else {
            console.log("Default admin created successfully");
          }
        }
      );
    }
  });

  // Insert default subscription plans
  const defaultPlans = [
    {
      name: "Monthly VIP",
      price: 49,
      duration: "1 Month",
      features: JSON.stringify([
        "Real-time XAU/USD signals",
        "Entry & exit points",
        "Risk management guidance",
        "Telegram group access",
        "Basic market analysis",
        "Email support"
      ])
    },
    {
      name: "6-Month VIP",
      price: 249,
      duration: "6 Months",
      features: JSON.stringify([
        "All Monthly VIP features",
        "Advanced technical analysis",
        "Weekly market outlook",
        "1-on-1 consultation (monthly)",
        "Custom indicator access",
        "Priority support",
        "Performance tracking"
      ])
    },
    {
      name: "Annual VIP",
      price: 449,
      duration: "12 Months",
      features: JSON.stringify([
        "All 6-Month VIP features",
        "Exclusive EA access",
        "Personal trading mentor",
        "Advanced risk calculator",
        "VIP webinar access",
        "Custom strategy development",
        "Lifetime community access"
      ])
    }
  ];

  defaultPlans.forEach(plan => {
    db.get("SELECT id FROM subscription_plans WHERE name = ?", [plan.name], (err, row) => {
      if (!row) {
        db.run(
          "INSERT INTO subscription_plans (name, price, duration, features) VALUES (?, ?, ?, ?)",
          [plan.name, plan.price, plan.duration, plan.features]
        );
      }
    });
  });

  console.log('Database initialized successfully');
});

db.close();