import express from "express";
import {
  alluser,
  alluserlength,
  byid,
  deleteUser,
  getProfile,
  loginUser,
  register,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

//Route To save new User
router.post("/register", register);

//Route for GET All Users from database
router.get("/alluser", alluser);
//Route for GET One Users from database by id
router.get("/:id", byid);

//Route for Update User
router.put("/:id", updateUser);

//Route for Delete User
router.delete("/:id", deleteUser);
//Route for login
router.post("/login", loginUser);

router.get("/profile", getProfile);

router.get("/alluser/length", alluserlength);

export default router;
