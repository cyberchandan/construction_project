const User = require('../models/User');
const { sendTokenCookie } = require('../utils/jwt');
const bcrypt = require('bcryptjs');

// Store in-memory user fallback if DB disconnected
let memoryUsers = [];

// @desc    Admin / Staff Login
// @route   POST /api/v1/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    let user = null;
    try {
      user = await User.findOne({ email: cleanEmail }).select('+passwordHash');
    } catch (err) {
      // Memory fallback if DB offline
      user = memoryUsers.find((u) => u.email === cleanEmail);
    }

    // Fallback check against env initial admin if user database empty/unavailable
    const envAdminEmail = (process.env.INITIAL_ADMIN_EMAIL || 'admin@buildconnectncr.com').toLowerCase();
    const envAdminPass = process.env.INITIAL_ADMIN_PASSWORD || 'Admin@BuildConnect2026';

    if (!user && cleanEmail === envAdminEmail) {
      const isPassMatch = password === envAdminPass;
      if (isPassMatch) {
        user = {
          _id: 'default_admin_id',
          name: process.env.INITIAL_ADMIN_NAME || 'Business Owner',
          email: envAdminEmail,
          role: 'admin',
          toSafeObject: function () {
            return { _id: this._id, name: this.name, email: this.email, role: this.role };
          },
        };
        return sendTokenCookie(res, user, 200, 'Admin authenticated successfully');
      }
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials provided.',
      });
    }

    let isMatch = false;
    if (user.comparePassword) {
      isMatch = await user.comparePassword(password);
    } else if (user.passwordHash) {
      isMatch = await bcrypt.compare(password, user.passwordHash);
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials provided.',
      });
    }

    sendTokenCookie(res, user, 200, 'Logged in successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Logout User / Clear Cookie
// @route   POST /api/v1/auth/logout
// @access  Private
const logout = (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

// @desc    Get Current Logged in User
// @route   GET /api/v1/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// @desc    Create Staff User (Admin Only)
// @route   POST /api/v1/admin/staff
// @access  Private (Admin Only)
const createStaff = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required',
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    try {
      const existingUser = await User.findOne({ email: cleanEmail });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists',
        });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name,
        email: cleanEmail,
        passwordHash,
        role: role === 'admin' ? 'admin' : 'staff',
      });

      return res.status(201).json({
        success: true,
        message: 'Staff account created successfully',
        user: newUser.toSafeObject(),
      });
    } catch (dbErr) {
      // In-memory fallback
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const newUser = {
        _id: 'mem_' + Date.now(),
        name,
        email: cleanEmail,
        passwordHash,
        role: role === 'admin' ? 'admin' : 'staff',
        toSafeObject: function () {
          return { _id: this._id, name: this.name, email: this.email, role: this.role };
        },
      };
      memoryUsers.push(newUser);

      return res.status(201).json({
        success: true,
        message: 'Staff account created successfully (Memory Mode)',
        user: newUser.toSafeObject(),
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  logout,
  getMe,
  createStaff,
};
