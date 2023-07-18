const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
        console.log(err)
        return res.status(403).json({ error: 'Invalid token' });
    }else{
        user = { userId: decoded.userId };
        // console.log(req.user)
        next();
    }

  });
};
