const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  newPassword: {
    type: String
  },
  phoneNumber: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Admin', 'Vendor'],
    default: 'Vendor'
  },
  OtpForVerification: {
    type: Number
  },
  ForgetPasswordOtp: {
    type: String
  },
  OtpGeneratedAt: {
    type: Date, // comment
  },
  listedProperties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }],
}, { timestamps: true });


// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {

  // Instilize user with this
  const user = this;

  // check if the password is modified
  if (!user.isModified('password')) {
    return next();
  }

  // Hash the password using bcrypt 
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    console.log(error);
    return next("Password Hashing Error");
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed', error);
  }
};

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
