import { HeartOutlined } from "@ant-design/icons";
import { Button, Card, Image, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import getRecipes, {
  fetchRecipesByName,
  fetchsavedRecipe,
  savedRecipe,
} from "../../../services/Allproduct";
import { userLogin } from "../../../services/Loginaction";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const carddata = useSelector((state) => state);
  const { data: allRecipes, loading } = useSelector(
    (state) => state.allproducts
  );
  const { data: searchResults } = useSelector((state) => state.recipeSearch); // Get search results
  const [searchTerm, setSearchTerm] = useState("");

  const { userInfo } = useSelector((state) => state.authSlice);

  useEffect(() => {
    // Fetch all recipes on component mount
    dispatch(getRecipes());

    // Only dispatch userLogin if there's no user data or token in Redux state
    if (!userInfo) {
      const savedUserInfo = localStorage.getItem("userInfo");
      const savedUserToken = localStorage.getItem("userToken");

      if (savedUserInfo && savedUserToken) {
        const userData = JSON.parse(savedUserInfo);
        dispatch(userLogin({ ...userData, token: savedUserToken }));
      }
    } else {
      // If user is logged in, fetch saved recipes from the backend
      const userId = userInfo._id;
      dispatch(fetchsavedRecipe(userId));
    }
  }, [dispatch, userInfo]); // Depend on userInfo to trigger fetching saved recipes when user logs in

  const handleSearch = () => {
    if (searchTerm) {
      dispatch(fetchRecipesByName(searchTerm)); // Dispatch search action
    } else {
      // Optionally fetch all recipes if search term is empty
      dispatch(getRecipes());
    }
  };

  const AddCart = (item) => {
    const fetchsavedRecipes = carddata?.fetchsaved?.data;
    const existingItemIndex = carddata?.fetchsaved?.data?.findIndex(
      (cartItem) => cartItem?.recipeId?._id === item?._id
    );

    console.log("dasdsadasd", existingItemIndex);
    if (existingItemIndex === -1 || fetchsavedRecipes.length === 0) {
      const userId = carddata?.authSlice?.userInfo?._id; // Get userId as a string
      const recipeId = item?._id; // Get RecipeId as a string

      // Dispatch savedRecipe to save the recipe to the cart
      dispatch(savedRecipe({ userId, recipeId }))
        .then(() => {
          // After saving the recipe, fetch the updated list of saved recipes
          dispatch(fetchsavedRecipe(userId)); // Fetch saved recipes
        })
        .catch((error) => {
          console.error("Error adding recipe to cart:", error);
        });
    } else {
      console.error("Already exists");
    }
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
                <HeartOutlined onClick={() => AddCart(item)} />
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
