import express from "express";
import {
  allSaved,
  deleteSavedRecipe,
  recipeSaved,
} from "../controllers/savedController.js";

const router = express.Router();

//Route To save new User
router.post("/bookmark", recipeSaved);

//Route for GET All Users from database
router.post("/getsaved", allSaved);

//Route for Delete User
router.delete("/deletesaved/:id", deleteSavedRecipe);

export default router;
