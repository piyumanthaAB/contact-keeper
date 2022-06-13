const jwt = require('jsonwebtoken');
// const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header
  const token = (req.cookies.jwt) || req.header('x-auth-token');

  const jsonToken = token ? token.toString() : null ;
  // console.log({token,jsonToken});

  // Check if not token
  if (!jsonToken) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(jsonToken, 'JWT_SECRET');

    req.user = decoded.user;
    next();
  } catch (err) {
    // console.log(err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
