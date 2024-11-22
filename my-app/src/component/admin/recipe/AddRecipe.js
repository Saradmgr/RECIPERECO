import { DeleteFilled } from "@ant-design/icons";
import { Button, Card, Image, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchRecipesByName,
  getRecipesAdmin,
} from "../../../services/Allproduct";

const AddRecipe = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carddata = useSelector((state) => state);
  const { data: allRecipes, loading } = useSelector(
    (state) => state.allproducts
  );
  console.log("Carddataadmin", carddata);
  const { data: searchResults } = useSelector((state) => state.allrecipe); // Get search results
  const [searchTerm, setSearchTerm] = useState("");

  const { userInfo } = useSelector((state) => state.authSlice);

  useEffect(() => {
    // Fetch all recipes on component mount
    dispatch(getRecipesAdmin());
    // Only dispatch userLogin if there's no user data or token in Redux state
  }, [dispatch]); // Depend on userInfo to trigger fetching saved recipes when user logs in

  const handleSearch = () => {
    if (searchTerm) {
      dispatch(fetchRecipesByName(searchTerm)); // Dispatch search action
    } else {
      // Optionally fetch all recipes if search term is empty
      dispatch(getRecipesAdmin());
    }
  };

  const handleDeleteRecipe = (id) => {
    // setLoading(true); // Set loading state to true before delete
    // // Optimistic update: Remove the recipe from the Redux state immediately
    // dispatch(deleteSavedRecipe(id)); // Dispatch action to remove recipe from state
    // // Now delete the recipe from the backend
    // axios
    //   .delete(`http://localhost:5000/saved/deletesaved/${id}`)
    //   .then(() => {
    //     dispatch(fetchsavedRecipe(userId)); // Fetch the updated list of saved recipes from backend (optional)
    //     setLoading(false); // Set loading state to false after delete is done
    //   })
    //   .catch((error) => {
    //     setLoading(false); // Set loading to false on error
    //     alert("Something Went Wrong");
    //     console.error(error);
    //   });
  };

  const handleRecipeClick = (id) => {
    navigate(`/details/${id}`);
  };

  // Determine which recipes to display
  const recipesToDisplay =
    searchResults.length > 0 ? searchResults : allRecipes;

  return (
    <div>
      <div className="search-bar">
        <Input
          placeholder="Search for a recipe..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 200, marginRight: 10 }}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <div className="grid grid-cols-12 grid-flow-row gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          recipesToDisplay?.map((item) => (
            <div key={item._id} className="md:col-span-2">
              <Card
                hoverable
                style={{ width: 240 }}
                cover={<Image alt={item?.RecipeName} src={item?.imageurl} />}
              >
                <div onClick={() => handleRecipeClick(item._id)}>
                  <div className="font-extrabold">{item?.RecipeName}</div>
                  <div className="font-bold">Cuisine: {item?.Cuisine}</div>
                  <div className="font-bold">
                    Total Time: {item?.TotalTimeInMins} mins
                  </div>
                </div>
                <DeleteFilled onClick={() => handleDeleteRecipe(item._id)} />
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddRecipe;
