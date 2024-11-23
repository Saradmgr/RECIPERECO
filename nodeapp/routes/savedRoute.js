import express from "express";
import {
  allSaved,
  allsavedrecipelength,
  deleteSavedRecipe,
  recipeSaved,
} from "../controllers/savedController.js";

const router = express.Router();

//Route To save new saved Recipe
router.post("/bookmark", recipeSaved);

//Route for GET All Saved Recipe according to user from database
router.post("/getsaved", allSaved);

//Route for Delete Saved Recipe
router.delete("/deletesaved/:id", deleteSavedRecipe);
//Route For all saved Recipe
router.get("/savedrecipelength", allsavedrecipelength);

export default router;
