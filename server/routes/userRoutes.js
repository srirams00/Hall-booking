const express = require('express');
const router = express.Router();
const User = require('../models/User');
const LoginHistory = require('../models/LoginHistory');

// Get all registered users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User login registration & log history audit trail creation
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  const staffUser = process.env.STAFF_USER || 'staff';
  const staffPass = process.env.STAFF_PASS || 'sjcstaff123';

  let matched = null;
  if (username.toLowerCase() === staffUser.toLowerCase() && (!password || password === staffPass)) {
    matched = {
      username: staffUser,
      displayName: 'Moderator',
      email: 'moderator@sjc.edu',
      department: 'Staff'
    };
  }

  if (!matched) {
    return res.status(401).json({ message: 'Invalid credentials. Access denied.' });
  }

  try {
    let user = await User.findOne({ username: matched.displayName });
    if (!user) {
      user = new User({
        id: "USR-" + Math.random().toString(36).substr(2, 5).toUpperCase(),
        username: matched.displayName,
        email: matched.email,
        department: matched.department
      });
      await user.save();
    }

    const log = new LoginHistory({
      username: user.username,
      email: user.email
    });
    await log.save();

    res.json({ user, log });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin login route
router.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const adminUser = process.env.ADMIN_USER || 'principal';
  const adminPass = process.env.ADMIN_PASS || 'Adminsjc123';

  if (username.toLowerCase() === adminUser.toLowerCase() && password === adminPass) {
    res.json({ displayName: 'Fr. Principal' });
  } else {
    res.status(401).json({ message: 'Invalid Administrator credentials. Access denied.' });
  }
});

// Delete user account from active directory
router.delete('/:id', async (req, res) => {
  try {
    const result = await User.findOneAndDelete({ id: req.params.id });
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User successfully deleted', user: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user login audit logs
router.get('/history', async (req, res) => {
  try {
    const history = await LoginHistory.find().sort({ _id: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
