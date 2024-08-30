const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken()
  console.log(token)

  // Options for the cookie
  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Cookie expires in 1 day
    httpOnly: true, // Cookie is accessible only by the web server
  };

  // Send the response with the token and user info
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
