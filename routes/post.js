const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');
const Post = require('../db/models/Post');
const User = require('../db/models/User');

// @route   POST api/posts
// @desc    Create New Post
// @access  Private
router.post(
   '/',
   auth,
   [check('text', 'Post text is required.').not().isEmpty()],
   async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }

      let { text } = req.body;
      const user = req.user;

      text = text.trim();

      try {
         let newPost = new Post({
            text,
            user,
         });

         newPost = await newPost.save();

         newPost = await Post.populate(newPost, 'user');

         res.json({ success: true, newPost });
      } catch (error) {
         res.status(500).json({ success: false, errors: [error.message] });
      }
   }
);

// @route   POST api/posts
// @desc    Get All Post
// @access  Public
router.get('/', async (req, res) => {
   try {
      const posts = await Post.find()
         .populate('user')
         .sort({ createdAt: 'desc' });

      res.json({ success: true, posts });
   } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, errors: [error.message] });
   }
});

// @route   POST api/posts/:username
// @desc    Get All Post By Username
// @access  Public
router.get('/:username', async (req, res) => {
   const username = req.params.username;

   try {
      const user = await User.findOne({ username: username });

      if (!user) {
         return res.status(404).json({
            success: false,
            errors: [`No such user with the username ${username}`],
         });
      }

      const userPosts = await Post.find({ user: user._id })
         .populate('user')
         .sort({ createdAt: 'desc' });

      res.json({ success: true, userPosts });
   } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, errors: [error.message] });
   }
});

module.exports = router;
