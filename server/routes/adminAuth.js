import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

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
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    req.session.admin = { username };
    return res.json({ success: true, message: "Admin logged in" });
  }
  res.status(401).json({ success: false, message: "Invalid credentials" });
});

// GET /api/admin/check
router.get("/check", (req, res) => {
  if (req.session.admin) {
    return res.json({ loggedIn: true, admin: req.session.admin });
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

export default router;
