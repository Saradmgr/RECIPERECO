import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "antd";
import { fetchRecipesByName } from "../../../services/Allproduct";

const RecipeSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.recipeSearch);

  const handleSearch = () => {
    if (searchTerm) {
      dispatch(fetchRecipesByName(searchTerm));
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a recipe..."
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div>
        {data.map((recipe) => (
          <Card key={recipe._id} title={recipe.RecipeName}>
            <p>{recipe.Ingredients}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
