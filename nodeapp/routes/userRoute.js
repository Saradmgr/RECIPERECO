import express from "express";
import {
  alluser,
  byid,
  deleteUser,
  getProfile,
  loginUser,
  register,
  updateUser,
  verifyToken,
} from "../controllers/userController.js";
import { User } from "../models/userModels.js";

const router = express.Router();

//Route To save new User
router.post("/", register);

//Route for GET All Users from database
router.get("/", alluser);
//Route for GET One Users from database by id
router.get("/:id", byid);

//Route for Update User
router.put("/:id", updateUser);

//Route for Delete User
router.delete("/:id", deleteUser);
//Route for login
router.post("/login", loginUser);

router.get("/profile", getProfile);

router.get("/verify", verifyToken, async (req, res) => {
  try {
    // Fetch the user details using the ID from the token
    const user = await User.findById(req.user.id).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return user details in response
    res.json({ user });
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
