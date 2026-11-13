import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Put this before any route that needs a logged-in user. It sets req.user.
export default async function protect(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Not logged in." });

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!user) throw new Error("User no longer exists");
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Session expired. Please log in again." });
  }
}
