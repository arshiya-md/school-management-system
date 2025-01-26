module.exports = () => {
  return async ({ req, res, next }) => {
    try {
      const role = req.decoded.userRole;
      const schoolId = req.decoded.schoolId;

      if (!role || !schoolId) {
        console.log('Missing user role or school ID in the request');
        return res.status(400).json({ error: 'Unauthorized access' });
      }

      if (role !== 'school-admin' || (schoolId != req.body.schoolId && schoolId != req.query.schoolId)) {
        console.log(`Unauthorized access attempt. Role: ${role}, SchoolId: ${schoolId}`, req.body.schoolId);
        return res.status(403).json({ error: 'Unauthorized access' });
      }
      next();
    } catch (error) {
      console.log(`Error in middleware: ${error.message}`, error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
};
