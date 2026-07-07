const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const LoginHistory = require('../models/LoginHistory');
const { requireAdmin } = require('../middleware/auth');

// ─── Staff / Moderator Login ──────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const staffUser = process.env.STAFF_USER;
  const staffHash = process.env.STAFF_PASS_HASH;

  if (!staffHash) {
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  const isValidUser = username.toLowerCase() === staffUser.toLowerCase();
  const isValidPass = await bcrypt.compare(password, staffHash);

  if (!isValidUser || !isValidPass) {
    return res.status(401).json({ message: 'Invalid credentials. Access denied.' });
  }

  const displayName = 'Moderator';
  const email = 'moderator@sjc.edu';
  const department = 'Staff';

  try {
    // Upsert user record
    let user = await User.findOne({ username: displayName });
    if (!user) {
      user = new User({
        id: 'USR-' + Math.random().toString(36).substr(2, 5).toUpperCase(),
        username: displayName,
        email,
        department
      });
      await user.save();
    }

    // Audit log
    const log = new LoginHistory({ username: displayName, email });
    await log.save();

    // Issue JWT
    const token = jwt.sign(
      { username: displayName, role: 'moderator', email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    res.json({ token, user, displayName });
  } catch (err) {
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
});

// ─── Admin Login ─────────────────────────────────────────────────────────────
router.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const adminUser = process.env.ADMIN_USER;
  const adminHash = process.env.ADMIN_PASS_HASH;

  if (!adminHash) {
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  const isValidUser = username.toLowerCase() === adminUser.toLowerCase();
  const isValidPass = await bcrypt.compare(password, adminHash);

  if (!isValidUser || !isValidPass) {
    return res.status(401).json({ message: 'Invalid Administrator credentials. Access denied.' });
  }

  const displayName = 'Fr. Principal';

  // Issue JWT
  const token = jwt.sign(
    { username: adminUser, role: 'admin', displayName },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
  );

  res.json({ token, displayName });
});

module.exports = router;
