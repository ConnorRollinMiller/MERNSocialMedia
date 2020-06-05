const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   const token = req.header('x-auth-token');

   if (!token) {
      return res.status(401).json({ msg: 'No token. Authorization denied.' });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = decoded.data;

      next();
   } catch (error) {
      console.log(error);
      res.status(401).json({ msg: `${error.message}` });
   }
};
