const jwt = require('jsonwebtoken');

/**
 * requireAuth — verifies JWT in Authorization: Bearer <token> header.
 * Attaches decoded payload to req.user on success.
 */
const requireAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required. Please log in.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Session expired or invalid. Please log in again.' });
  }
};

/**
 * requireAdmin — extends requireAuth; additionally checks role === 'admin'.
 */
const requireAdmin = (req, res, next) => {
  requireAuth(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Administrator access required.' });
    }
    next();
  });
};

module.exports = { requireAuth, requireAdmin };
