import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Add a simple GET route for testing
router.get("/test", (req, res) => {
  res.send("Auth route is working");
});

export default router;
