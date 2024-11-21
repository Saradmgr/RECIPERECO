import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AddToCart from "./slices/AddToCart";
import Allproducts from "./slices/Allproducts";
import Detailsfetch from "./slices/Detailsfetch";
import Favourite from "./slices/Favourite";
import authSlice from "./slices/LoginSlices";
import RecommendationSlice from "./slices/RecommendationSlice";
import Userslice from "./slices/Userslice";
import fetchSavedSlice from "./slices/fetchSavedSlice.js";
import filterslice from "./slices/filterslice";
import recipeSearchSlice from "./slices/recipeSearchSlice";
import savedRecipeSlice from "./slices/savedRecipeSlice";

// Create reset reducer function if needed (optional)
import { createResetMetaReducer } from "./slices/metaReducer";

// List of slices to reset when required
const resetSlices = [
  "addToCart",
  "allproducts",
  "detailfetch",
  "mealfetch",
  "auth",
  "favourite",
  "filter",
  "recommendations",
  "recipeSearch",
  "registerUser",
  "saved",
  "fetchsaved",
];

const rootReducer = createResetMetaReducer(
  "GLOBAL_RESET",
  resetSlices
)(
  combineReducers({
    addToCart: AddToCart,
    allproducts: Allproducts,
    detailfetch: Detailsfetch,
    authSlice: authSlice,
    favourite: Favourite,
    filter: filterslice,
    recommendations: RecommendationSlice,
    recipeSearch: recipeSearchSlice,
    registerUser: Userslice,
    saved: savedRecipeSlice,
    fetchsaved: fetchSavedSlice,
  })
);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authSlice"], // Persist the auth slice only (authentication-related data)
};

export default persistReducer(persistConfig, rootReducer);
