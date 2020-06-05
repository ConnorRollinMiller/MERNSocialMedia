const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
   {
      username: {
         type: String,
         required: [true, 'Username is required.'],
         unique: true,
      },
      password: {
         type: String,
         required: [true, 'Password is required.'],
      },
      email: {
         type: String,
         required: [true, 'Email is required.'],
         unique: true,
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
