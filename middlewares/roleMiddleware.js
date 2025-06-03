const restrictTo = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: 'Forbidden, admin access required' });
    }
    next();
  };
};

module.exports = { restrictTo };
