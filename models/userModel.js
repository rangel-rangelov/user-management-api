const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_FACTOR = 10;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre('save', next => {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if(err) return next(err);

      user.password = hash;
      next();
    })
  })
});

UserSchema.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if(err) return cb(err);
    cb(null, isMatch);
  })
};

module.exports = mongoose.model('users', UserSchema);
