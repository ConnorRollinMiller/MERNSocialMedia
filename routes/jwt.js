const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// @route   POST api/jwt
// @desc    Check User Token
// @access  Public
router.post('/', check('token', 'Must provide a jwt.'), async (req, res) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   try {
      const { token } = req.body;

      const decoded = jwt.verify(token, JWT_SECRET_KEY);

      res.json({ success: true, user: decoded.data });
   } catch (error) {
      console.log(error);
      res.status(500).json({ success: false });
   }
});

module.exports = router;
