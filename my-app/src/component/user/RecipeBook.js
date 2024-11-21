import { DeleteFilled } from "@ant-design/icons";
import { Card, Spin } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteSavedRecipe } from "../../redux/slices/fetchSavedSlice.js";
import { fetchsavedRecipe } from "../../services/Allproduct";

const RecipeBook = ({ closeModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Track loading state for delete operation

  const userId = useSelector(
    (state) => state?.carddata?.authSlice?.userInfo?._id
  );
  const savedRecipes = useSelector((state) => state?.fetchsaved?.data); // Access saved recipes from Redux store

  const handleDetails = (item) => {
    // Navigate to details page of the recipe
    navigate(`/details/${item?.recipeId?._id}`);
    closeModal();
  };

  // Handle deleting a recipe
  const handleDeleteRecipe = (id) => {
    setLoading(true); // Set loading state to true before delete

    // Optimistic update: Remove the recipe from the Redux state immediately
    dispatch(deleteSavedRecipe(id)); // Dispatch action to remove recipe from state

    // Now delete the recipe from the backend
    axios
      .delete(`http://localhost:5000/saved/deletesaved/${id}`)
      .then(() => {
        dispatch(fetchsavedRecipe(userId)); // Fetch the updated list of saved recipes from backend (optional)
        setLoading(false); // Set loading state to false after delete is done
      })
      .catch((error) => {
        setLoading(false); // Set loading to false on error
        alert("Something Went Wrong");
        console.error(error);
      });
  };

  return (
    <div>
      <div className="grid grid-cols-12 grid-flow-row gap-4">
        {loading ? (
          // Show a loading spinner while the delete is in progress
          <div className="col-span-12 text-center">
            <Spin size="large" />
          </div>
        ) : (
          savedRecipes?.map((savedItem) => (
            <div key={savedItem._id} className="md:col-span-3">
              <Card
                hoverable
                style={{
                  width: 150,
                  transition: "yellow 0.3s ease",
                }}
                cover={
                  <img
                    alt={savedItem?.recipeId?.RecipeName}
                    src={savedItem?.recipeId?.imageurl}
                  />
                }
              >
                <div className="h-30">
                  <div
                    className="h-30"
                    onClick={() => handleDetails(savedItem)}
                  >
                    <div className="font-semibold">
                      {savedItem?.recipeId?.RecipeName}
                    </div>
                  </div>
                  <div>
                    <DeleteFilled
                      onClick={() => handleDeleteRecipe(savedItem._id)}
                    />
                  </div>
                </div>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipeBook;
