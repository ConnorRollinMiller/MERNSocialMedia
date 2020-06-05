const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../db/models/User');

const SALT_ROUNDS = 5;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const createJwt = (data) => {
   return jwt.sign({ data: data }, JWT_SECRET_KEY, {
      expiresIn: '12h',
   });
};

// @route   POST api/users
// @desc    Login User
// @access  Public
router.post(
   '/',
   [
      check('username', 'Username is required.').exists(),
      check('password', 'Password is required.').exists(),
   ],
   async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      let { username, password } = req.body;

      username = username.trim();
      password = password.trim();

      try {
         const user = await User.findOne({ username });

         if (!user) {
            return res.status(404).json({
               success: false,
               errors: ['Credentials are incorrect.'],
            });
         }

         const isMatch = await bcrypt.compare(password, user.password);

         if (!isMatch) {
            return res.status(404).json({
               success: false,
               errors: ['Credentials are incorrect.'],
            });
         }

         const token = await createJwt(user);

         res.json({ user: user, token });
      } catch (error) {
         console.log(error);
         res.status(500).json({ success: false, errors: [error.message] });
      }
   }
);

// @route   POST api/users/register
// @desc    Create New User
// @access  Public
router.post(
   '/register',
   [
      check('username', 'Username minimum length of 5.').isLength({ min: 5 }),
      check('email', 'Please include a valid email.').isEmail(),
      check('password', 'Password minimum length of 5.').isLength({ min: 5 }),
      check('confirmPassword', 'Password minimum length of 5.').not().isEmpty(),
   ],
   async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      let { username, email, password, confirmPassword } = req.body;

      username = username.trim();
      email = email.trim();
      password = password.trim();
      confirmPassword = confirmPassword.trim();

      if (password !== confirmPassword) {
         return res.status(400).json({ errors: ['Passwords must match.'] });
      }

      try {
         const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

         const newUser = new User({
            username,
            email,
            password: hashedPassword,
         });

         await newUser.save();

         const token = await createJwt(newUser);

         res.json({ success: true, user: newUser, token });
      } catch (error) {
         console.log(`\n`, error, `\n`);
         res.status(500).json({ success: false, errors: [error.message] });
      }
   }
);

module.exports = router;
