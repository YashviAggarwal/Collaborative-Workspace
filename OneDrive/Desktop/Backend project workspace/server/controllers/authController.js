import jwt from "jsonwebtoken";
import User from "../models/User.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
const publicUser = (u) => ({ id: u._id, name: u.name, email: u.email });
const sendAuth = (res, status, user) => res.status(status).json({ token: signToken(user._id), user: publicUser(user) });
const bad = (res, status, message, field) => res.status(status).json({ message, field });

export const signup = async (req, res) => {
  const { name = "", email = "", password = "" } = req.body;

  if (name.trim().length < 2) return bad(res, 400, "Enter your full name.", "name");
  if (!EMAIL_RE.test(email.trim())) return bad(res, 400, "Enter a valid email address.", "email");
  if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password))
    return bad(res, 400, "Use at least 8 characters with a letter and a number.", "password");

  if (await User.findOne({ email: email.trim().toLowerCase() }))
    return bad(res, 409, "An account with this email already exists.", "email");

  const user = await User.create({ name, email, password });
  sendAuth(res, 201, user);
};

export const login = async (req, res) => {
  const { email = "", password = "" } = req.body;

  const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+password");
  // Same message for wrong email and wrong password, so attackers can't tell which one exists
  if (!user || !(await user.matchesPassword(password))) return bad(res, 401, "Incorrect email or password.");

  sendAuth(res, 200, user);
};

export const me = (req, res) => res.json({ user: publicUser(req.user) });
