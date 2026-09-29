const jwt = require('jsonwebtoken');

const getJwtSecret = () => process.env.JWT_SECRET || 'buildconnect_ncr_super_secure_jwt_secret_key_2026';

const generateToken = (payload) => {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, getJwtSecret());
};

const sendTokenCookie = (res, user, statusCode = 200, message = 'Success') => {
  const token = generateToken({ id: user._id, role: user.role, email: user.email });

  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
  };

  res.cookie('token', token, cookieOptions);

  return res.status(statusCode).json({
    success: true,
    message,
    token, // Optional for clients header auth if cookies restricted
    user: typeof user.toSafeObject === 'function' ? user.toSafeObject() : user,
  });
};

module.exports = {
  generateToken,
  verifyToken,
  sendTokenCookie,
};
