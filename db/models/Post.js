const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
   {
      text: {
         type: String,
         required: [true, 'Post text is required.'],
      },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: [true, 'User is required.'],
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
