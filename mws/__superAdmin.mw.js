module.exports = (injectable) => {
  return async ({ req, res, next }) => {
    try {
      if (!req.decoded || !req.decoded.userRole) {
        console.log('Missing user role in the token');
        return res.status(400).json({ error: 'User role is missing in the request' });
      }

      const role = req.decoded.userRole;

      if (role !== 'super-admin') {
        console.log(`Unauthorized access attempt by role: ${role}`);
        return res.status(403).json({ error: 'Unauthorized access' });
      }

      next();
    } catch (error) {
      console.log(`Error in super admin role validation middleware: ${error.message}`, error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
};
