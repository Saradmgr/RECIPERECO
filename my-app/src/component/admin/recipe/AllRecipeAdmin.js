import { DeleteFilled } from "@ant-design/icons";
import { Card, Image, Pagination, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteRecipe } from "../../../redux/slices/AllRecipeSlices";
import { getRecipesAdmin } from "../../../services/Allproduct";

const AllRecipeAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Track loading state for delete operation
  const { data: allRecipes } = useSelector((state) => state.allproducts);
  const { data: searchResults } = useSelector((state) => state.allrecipe); // Get search results

  const { userInfo } = useSelector((state) => state.authSlice);

  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const recipesPerPage = 10; // Number of recipes per page

  useEffect(() => {
    // Fetch all recipes on component mount
    dispatch(getRecipesAdmin());
  }, [dispatch]);

  const handleDeleteRecipe = (id) => {
    setLoading(true); // Set loading state to true before delete
    // Optimistic update: Remove the recipe from the Redux state immediately
    dispatch(deleteRecipe(id)); // Dispatch action to remove recipe from state

    // Now delete the recipe from the backend
    axios
      .delete(`http://localhost:5000/recipes/deleterecipe/${id}`)
      .then(() => {
        dispatch(getRecipesAdmin()); // Fetch the updated list of saved recipes from backend (optional)
        setLoading(false); // Set loading state to false after delete is done
      })
      .catch((error) => {
        setLoading(false); // Set loading to false on error
        alert("Something Went Wrong");
        console.error(error);
      });
  };

  const handleRecipeClick = (id) => {
    navigate(`/details/${id}`);
  };

  // Determine which recipes to display
  const recipesToDisplay =
    searchResults.length > 0 ? searchResults : allRecipes;

  // Slice the recipes to display only the ones for the current page
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipesToDisplay.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center">
            <Spin size="large" />
          </div>
        ) : (
          currentRecipes?.map((item) => (
            <div key={item._id} className="flex justify-center">
              <Card
                hoverable
                style={{
                  width: "100%",
                  maxWidth: "240px",
                  minHeight: "300px", // Reduced card height
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  padding: "12px", // Reduced padding
                }}
                cover={
                  <Image
                    alt={item?.RecipeName}
                    src={item?.imageurl}
                    style={{
                      height: "200px", // Set height for square aspect
                      objectFit: "cover", // Ensure the image fills the square without distortion
                    }}
                  />
                }
              >
                <div onClick={() => handleRecipeClick(item._id)}>
                  <div className="font-extrabold text-lg text-center mb-2">
                    {item?.RecipeName}
                  </div>
                  <div className="text-center text-sm text-gray-600">
                    <div className="font-bold">Cuisine: {item?.Cuisine}</div>
                    <div>Total Time: {item?.TotalTimeInMins} mins</div>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <DeleteFilled
                    onClick={() => handleDeleteRecipe(item._id)}
                    className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                    style={{ fontSize: "24px" }}
                  />
                </div>
              </Card>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          total={recipesToDisplay.length} // Total number of recipes in display (filtered or all)
          pageSize={recipesPerPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AllRecipeAdmin;
