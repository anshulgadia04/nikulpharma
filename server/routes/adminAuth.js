import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { AdminUser } from "../models/AdminUser.js";
import { isAuthenticated, isAdmin } from "../middleware/rbac.js";

dotenv.config();
const router = express.Router();

// Rate limiter for login attempts - 5 attempts per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { 
    success: false,
    error: 'Too many login attempts from this IP, please try again after 15 minutes.' 
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Middleware for session setup (attach it once globally in server.js ideally)
router.use(cookieParser());
router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // change to true if using HTTPS
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 2, // 2 hours
    },
  })
);

// POST /api/admin/login
router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    // First check if it's the main admin (from .env)
    if (
      username === process.env.ADMIN_USER &&
      password === process.env.ADMIN_PASS
    ) {
      req.session.admin = { 
        username,
        role: 'admin',
        fullName: 'Administrator',
        permissions: {
          canViewAnalytics: true,
          canViewInquiries: true,
          canViewLeads: true,
          canViewProducts: true,
          canDeleteInquiries: true,
          canDeleteLeads: true,
          canEditProducts: true,
          canAddProducts: true,
          canDeleteProducts: true,
        }
      };
      console.log('Main admin logged in:', req.session.admin);
      return res.json({ 
        success: true, 
        message: "Admin logged in",
        user: req.session.admin
      });
    }

    // Check database for staff/sub-admins (check both username and email)
    const user = await AdminUser.findOne({ 
      $or: [
        { username: username },
        { email: username }
      ],
      isActive: true 
    });
    
    console.log('Searching for user with username/email:', username);
    console.log('Found user:', user ? user.username : 'Not found');
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    // Verify password
    console.log('Attempting to verify password...');
    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);
    
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Set session
    req.session.admin = user.toSafeObject();
    
    console.log('User logged in:', req.session.admin);
    
    res.json({ 
      success: true, 
      message: "Logged in successfully",
      user: req.session.admin
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
});

// GET /api/admin/check
router.get("/check", (req, res) => {
  console.log(req.session);
  if (req.session.admin) {
    return res.json({ 
      loggedIn: true, 
      admin: req.session.admin 
    });
  }
  res.status(401).json({ loggedIn: false });
});

// POST /api/admin/logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ success: true, message: "Logged out successfully" });
  });
});

// ============================================================
// SUB-ADMIN MANAGEMENT ROUTES (Admin Only)
// ============================================================

// GET /api/admin/users - List all sub-admins
router.get("/users", isAdmin, async (req, res) => {
  try {
    const users = await AdminUser.find()
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, users });
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// POST /api/admin/users - Create new sub-admin
router.post("/users", isAdmin, async (req, res) => {
  try {
    const { username, password, email, fullName, role = 'subadmin' } = req.body;

    // Check if username or email already exists
    const existing = await AdminUser.findOne({
      $or: [{ username }, { email }]
    });

    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: "Username or email already exists" 
      });
    }

    // Create new user with default subadmin permissions
    const newUser = new AdminUser({
      username,
      password,
      email,
      fullName,
      role,
      permissions: {
        canViewAnalytics: false, // Subadmins cannot view analytics
        canViewInquiries: true,
        canViewLeads: true,
        canViewProducts: true,
        canDeleteInquiries: false, // Cannot delete
        canDeleteLeads: false, // Cannot delete
        canEditProducts: false,
        canAddProducts: false,
        canDeleteProducts: false,
      },
      createdBy: req.session.admin.username,
    });

    await newUser.save();

    res.json({ 
      success: true, 
      message: "Sub-admin created successfully",
      user: newUser.toSafeObject()
    });
  } catch (err) {
    console.error('Create user error:', err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// PUT /api/admin/users/:id - Update sub-admin
router.put("/users/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { email, fullName, isActive, permissions } = req.body;

    const user = await AdminUser.findById(id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Update fields
    if (email) user.email = email;
    if (fullName) user.fullName = fullName;
    if (typeof isActive !== 'undefined') user.isActive = isActive;
    if (permissions) user.permissions = permissions;

    await user.save();

    res.json({ 
      success: true, 
      message: "User updated successfully",
      user: user.toSafeObject()
    });
  } catch (err) {
    console.error('Update user error:', err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// DELETE /api/admin/users/:id - Delete sub-admin
router.delete("/users/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await AdminUser.findByIdAndDelete(id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.json({ 
      success: true, 
      message: "Sub-admin deleted successfully" 
    });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// POST /api/admin/users/:id/reset-password - Reset sub-admin password
router.post("/users/:id/reset-password", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: "Password must be at least 6 characters" 
      });
    }

    const user = await AdminUser.findById(id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({ 
      success: true, 
      message: "Password reset successfully" 
    });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
