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

  const validUsers = [
    { username: 'staff', password: 'sjcstaff123', displayName: 'Moderator', email: 'moderator@sjc.edu', department: 'Staff' }
  ];

  const matched = validUsers.find(
    u => u.username.toLowerCase() === username.toLowerCase() && (!password || u.password === password)
  );

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
