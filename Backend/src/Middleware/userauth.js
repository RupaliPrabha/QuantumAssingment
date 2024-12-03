const jwt = require('jsonwebtoken');
const User = require('../Schema/userSchema');
require("dotenv").config() ;

// Middleware to authenticate the token
const authenticateuser = async (req, res, next) => {
    const authHeader = req.header('authorization')
    console.log(authHeader,"authheader");
    
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token ,"token111");
    
  
  if (!token) {
    return res.status(401).json({ status: false, message: 'Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded,"decoded token")
    console.log(decoded._id,"decoded._id")
    const user = await User.findById(decoded._id);
    console.log("decoded admin", user);
  
    if (!user) {
      return res.status(401).json({ status: false, message: 'Admin not found' });
    }

    if (!user.token.includes(token)) {
      return res.status(401).json({ status: false, message: 'Token is not valid' });
    }
    req.user = user;
    console.log(req.user,"req-user");
    
  
    next();
  }
  
  catch (error) {
    return res.status(403).json({ status: false, message: 'Token verification failed' });
  }
};


module.exports = {authenticateuser};
