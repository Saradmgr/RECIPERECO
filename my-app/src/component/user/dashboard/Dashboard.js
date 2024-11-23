import { HeartOutlined } from "@ant-design/icons";
import { Button, Card, Image, Input, Spin } from "antd";
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
  }, [dispatch, userInfo]);

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

    if (userInfo) {
      if (existingItemIndex === -1 || fetchsavedRecipes.length === 0) {
        const userId = carddata?.authSlice?.userInfo?._id;
        const recipeId = item?._id;

        dispatch(savedRecipe({ userId, recipeId }))
          .then(() => {
            dispatch(fetchsavedRecipe(userId));
          })
          .catch((error) => {
            console.error("Error adding recipe to cart:", error);
          });
      } else {
        console.error("Already exists");
      }
    } else {
      navigate("/auth/login");
    }
  };

  const handleDetails = (item) => {
    // Navigate to details page of the recipe
    navigate(`/details/${item?._id}`);
  };

  const recipesToDisplay =
    searchResults.length > 0 ? searchResults : allRecipes;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Search Bar */}
      <div className="flex justify-center items-center mb-6">
        <Input
          placeholder="Search for a recipe..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "60%",
            maxWidth: "300px",
            marginRight: "10px",
          }}
          className="shadow-md"
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center">
            <Spin size="large" />
          </div>
        ) : (
          recipesToDisplay?.map((item) => (
            <div key={item._id} className="flex justify-center">
              <Card
                hoverable
                style={{
                  width: "100%",
                  maxWidth: "240px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
                cover={
                  <Image
                    alt={item?.RecipeName}
                    src={item?.imageurl}
                    style={{
                      height: "200px", // Set a fixed height to make the image square
                      width: "200px", // Set a fixed width to make the image square
                      objectFit: "cover", // Ensures the image covers the area without distortion
                      margin: "0 auto", // Centers the image within the card
                    }}
                  />
                }
                onClick={() => handleDetails(item)} // Add onClick to navigate to details page
              >
                <div className="font-extrabold text-lg text-center mb-2">
                  {item?.RecipeName}
                </div>
                <div className="text-center text-sm text-gray-600">
                  <div className="font-bold">Cuisine: {item?.Cuisine}</div>
                  <div>Total Time: {item?.TotalTimeInMins} mins</div>
                </div>
                <div className="mt-4 flex justify-center">
                  <HeartOutlined
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click event from triggering the recipe click
                      AddCart(item);
                    }}
                    className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                    style={{ fontSize: "24px" }}
                  />
                </div>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
